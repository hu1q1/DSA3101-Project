# Import necessary packages
import os
from dotenv import load_dotenv, find_dotenv
from pathlib import Path
import shutil
import pandas as pd

# Importing required modules from langchain package
from langchain.docstore.document import Document
from langchain_community.llms import HuggingFaceEndpoint
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from operator import itemgetter
from langchain_core.runnables import RunnableParallel
from langchain_core.output_parsers import StrOutputParser

# Importing required modules from transformers package
from transformers import pipeline
from transformers.utils import logging

# Importing custom function for creating vectordb
from create_vectordbs import *

# Importing mysql database related custom functions
from create_database import *

# Suppressing unnecessary logs
logging.set_verbosity_error()


# Check if .env file exists in the current directory
if os.path.isfile(".env"):
    # If .env file exists, load environment variables from it
    dotenv_path = Path(".env")  # Set path to .env file
    load_dotenv(dotenv_path=dotenv_path)
else:
    # If .env file doesn't exist, attempt to find and load environment variables
    load_dotenv(find_dotenv())


# Initialize the Language Model (LLM) using Hugging Face endpoint
ENDPOINT_URL = (
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
)

# Define parameters for the Hugging Face endpoint
llm = HuggingFaceEndpoint(
    endpoint_url=ENDPOINT_URL,  # URL of the Hugging Face API endpoint
    task="text-generation",  # Specify the task for the model
    max_new_tokens=128,  # Maximum number of tokens to generate
    temperature=0.01,  # Controls randomness in sampling
    return_full_text=False,  # Specify whether to return the full generated text
    streaming=True,  # Enable streaming mode for efficient processing of long texts
    stop_sequences=["</s>"],  # Specify sequences to stop generation
)


# Initialize an embedding model from Hugging Face
embedding_model = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2",  # Name of the pre-trained model to use for embeddings
    model_kwargs={"device": "cpu"},  # Specify device for inference (CPU in this case)
    encode_kwargs={
        "normalize_embeddings": False
    },  # Specify if embeddings should be normalized
)


def get_vectorstore(stage: int):
    """
    Retrieve the vectorstore (FAISS index).

    If an updated FAISS index is found locally, load it. Otherwise, load the default FAISS index.

    Args:
        stage (int): The stage of the survey the user is currently at.

    Returns:
        FAISS index: The vectorstore loaded from the local directory.
    """
    if stage == -1:
        db = FAISS.load_local(
            "demographic_questions",
            embedding_model,
            allow_dangerous_deserialization=True,
        )
    elif stage == 0:
        db = FAISS.load_local(
            "stage_0_questions", embedding_model, allow_dangerous_deserialization=True
        )
    elif stage == 1:
        db = FAISS.load_local(
            "stage_1_questions", embedding_model, allow_dangerous_deserialization=True
        )
    elif stage == 2:
        db = FAISS.load_local(
            "stage_2_questions", embedding_model, allow_dangerous_deserialization=True
        )
    elif stage == 3:
        db = FAISS.load_local(
            "stage_3_questions", embedding_model, allow_dangerous_deserialization=True
        )
    return db


def get_retriever(vectorstore: FAISS):
    """
    Get a retriever object for retrieving the next best question from the vectorstore.

    Args:
        vectorstore (FAISS): The FAISS vectorstore used for retrieval.

    Returns:
        retriever: The retriever object configured to retrieve the best follow-up question.
    """
    # Configure retriever to retrieve only the next best question
    retriever = vectorstore.as_retriever(search_kwargs={"k": 1})
    return retriever


def create_chat_log():
    """
    Create a chat log for logging conversations.

    Returns:
        ConversationBufferMemory: The memory object for storing chat history.
    """
    memory = ConversationBufferMemory(return_messages=False, memory_key="chat_history")
    return memory


def add_to_chat_log(
    chat_log: ConversationBufferMemory, message_type: str, message: str
):
    """
    Add a message to the chat log.

    Args:
        chat_log (ConversationBufferMemory): The chat log to which the message will be added.
        message_type (str): The type of message ('ai' for AI-generated message, 'user' for user input).
        message (str): The content of the message.
    """
    # Add message to the chat log based on message type
    if message_type == "ai":
        chat_log.chat_memory.add_ai_message(message)
    else:
        chat_log.chat_memory.add_user_message(message)


def get_chat_history(chat_log: ConversationBufferMemory):
    """
    Retrieve the chat history from the chat log.

    Args:
        chat_log (ConversationBufferMemory): The chat log from which to retrieve the chat history.

    Returns:
        list: The chat history.
    """
    # Load chat history from the chat log
    chat_history = chat_log.load_memory_variables({})["chat_history"]
    return chat_history


def get_rag_chain(retriever):
    """
    Construct a RAG (Retrieval Augmented Generation) chain for generating follow-up questions.

    Args:
        retriever: The retriever object used to retrieve the next best question.

    Returns:
        RunnableParallel: The RAG chain for generating follow-up questions.
    """
    # General prompt for all questions
    prompt_template = """You are a friendly survey interface assistant.
        You are given a survey question, a survey user response to that question, the sentiment of the user response and a follow-up question below.
        Reply to the survey user response kindly and just ask the follow-up question. Do not ask any other questions.

        Question: {previous_question}
        User response: {user_response}
        User sentiment: {sentiment}
        Follow-up question: {next_question}
        
        Reply:"""
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=[
            "previous_question",
            "user_response",
            "next_question",
            "sentiment",
        ],
    )

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)
        # return "\n\n".join(doc.metadata['prompt'] + '\n' + doc.page_content for doc in docs)

    rag_chain = (
        # Retrieve next best question
        RunnableParallel(
            {
                "docs": itemgetter("user_response") | retriever,
                "user_response": itemgetter("user_response"),
                "sentiment": itemgetter("sentiment"),
                "previous_question": itemgetter("previous_question"),
            }
        )
        # Optional: Format question to ask user
        | (
            {
                "docs": lambda x: x["docs"],
                "user_response": itemgetter("user_response"),
                "sentiment": itemgetter("sentiment"),
                "next_question": lambda x: format_docs(x["docs"]),
                "previous_question": itemgetter("previous_question"),
            }
        )
        # Optional: Prompt Engineering - Each question to have their own prompt template for LLM to ask the question
        | (
            {
                "docs": lambda x: x["docs"],
                "prompt": prompt,
                "user_response": itemgetter("user_response"),
                "sentiment": itemgetter("sentiment"),
                "next_question": itemgetter("next_question"),
                "previous_question": itemgetter("previous_question"),
            }
        )
        # Output results
        | (
            {
                "answer": itemgetter("prompt") | llm | StrOutputParser(),
                "docs": lambda x: x["docs"],
                "user_response": itemgetter("user_response"),
                "sentiment": itemgetter("sentiment"),
                "previous_question": itemgetter("previous_question"),
            }
        )
    )
    return rag_chain


def get_user_sentiment(user_response: str):
    """
    Get the sentiment of a user response.

    Args:
        user_response (str): The user's response for sentiment analysis.

    Returns:
        str: The sentiment label of the user response (e.g., "positive", "negative", "neutral").
    """
    # Initialize sentiment analysis pipeline
    pipe = pipeline(
        "text-classification", model="cardiffnlp/twitter-roberta-base-sentiment-latest"
    )

    # Analyze sentiment of the user response
    user_sentiment = pipe(user_response)[0]["label"]

    return user_sentiment


def invoke_rag_chain(
    rag_chain, user_response: str, user_sentiment: str, previous_question: str
):
    """
    Invoke the RAG (Retrieval Augmented Generation) chain to generate a response.

    Args:
        rag_chain: The RAG chain for generating responses.
        user_response (str): The user's input or response.
        user_sentiment (str): The sentiment of the user's response.
        previous_question (str): The question asked for user's response.

    Returns:
        Dict[str, any]: A dictionary containing the generated response and other relevant information.
            - 'answer' (str): The generated response.
            - 'docs' (List[Document]): List of documents related to the response.
            - 'query' (str): The query used for generating the response.
    """
    output = (
        {}
    )  # Initialize output dictionary to store generated response and other information

    # Iterate over chunks of data from the RAG chain
    for chunk in rag_chain.stream(
        dict(
            user_response=user_response,
            sentiment=user_sentiment,
            previous_question=previous_question,
        )
    ):
        for key in chunk:
            # Update output dictionary with data from the current chunk
            if key not in output:
                output[key] = chunk[key].strip() if key == "answer" else chunk[key]
            # if key == 'answer':
            # new_token = chunk[key]
            # yield new_token
            # output[key] += new_token
            else:
                output[key] += chunk[key]
            # Print the generated answer if available
            if key == "answer":
                print(chunk[key], end="", flush=True)

    return output  # Return the output dictionary containing the generated response and other information


def get_llm_outputs(rag_chain, user_response: str, previous_question: str):
    """
    Get outputs from the LLM (Large Language Model) based on user response.

    Args:
        rag_chain: The RAG chain for generating responses.
        user_response (str): The user's input or response.
        previous_question (str): The question asked for user's response.

    Returns:
        tuple: A tuple containing the following elements:
            - llm_reply (str): The reply generated by the LLM.
            - next_question_document (Document): The document of the next question asked by the LLM.
            - next_question_id (int): The ID of the next question asked by the LLM.
    """
    # Get user sentiment
    user_sentiment = get_user_sentiment(user_response)

    # Get outputs from the RAG chain
    output = invoke_rag_chain(
        rag_chain, user_response, user_sentiment, previous_question
    )

    # Extract relevant information
    llm_reply = output["answer"]  # LLM reply to output to frontend
    next_question_document = output["docs"][
        0
    ]  # Document of the next question asked by LLM
    next_question_id = next_question_document.metadata[
        "id"
    ]  # ID of the next question asked by LLM

    return llm_reply, next_question_document, next_question_id


def remove_question_from_db(
    vectorstore: FAISS, document_to_delete: Document, stage: int
):
    """
    Remove a question document from the vectorstore.

    Args:
        vectorstore (FAISS): The FAISS vectorstore containing the question documents.
        document_to_delete (Document): The document to be removed from the vectorstore.
        stage (int): The stage of the survey the user is at.

    Returns:
        None
    """
    count = 0  # Initialize counter for iterating through vectorstore

    # Iterate through vectorstore to find the document to delete
    for key, item in vectorstore.docstore._dict.items():
        count += 1
        if item == document_to_delete:
            break

    # Delete the document from the vectorstore if found
    if count >= 0:
        vectorstore.delete([vectorstore.index_to_docstore_id[count - 1]])

    # Save the updated vectorstore in the local directory for persistence
    if stage == -1:
        vectorstore.save_local("demographic_questions")
    elif stage == 0:
        vectorstore.save_local("stage_0_questions")
    elif stage == 1:
        vectorstore.save_local("stage_1_questions")
    elif stage == 2:
        vectorstore.save_local("stage_2_questions")
    elif stage == 3:
        vectorstore.save_local("stage_3_questions")


def checkUserResponse(question_id: int, stage: int) -> bool:
    """
    Check if user response for a given question ID needs to be checked based on the stage.

    Args:
        question_id (int): The ID of the question to check.
        stage (int): The stage of the survey (0, 1, 2, or 3).

    Returns:
        bool: True if user response needs to be checked, False otherwise.
    """
    # Check the stage of the survey
    if stage == 0:
        # Iterate through stage 0 questions
        for question in stage_0_questions:
            # Check if question ID matches
            if question["id"] == question_id:
                # Check if user response needs to be checked
                if question["check_user_response"] == 0:
                    return False
                else:
                    return True
    elif stage == 1:
        # Iterate through stage 1 questions
        for question in stage_1_questions:
            # Check if question ID matches
            if question["id"] == question_id:
                # Check if user response needs to be checked
                if question["check_user_response"] == 0:
                    return False
                else:
                    return True
    elif stage == 2:
        # Iterate through stage 2 questions
        for question in stage_2_questions:
            # Check if question ID matches
            if question["id"] == question_id:
                # Check if user response needs to be checked
                if question["check_user_response"] == 0:
                    return False
                else:
                    return True
    elif stage == 3:
        # Iterate through stage 3 questions
        for question in stage_3_questions:
            # Check if question ID matches
            if question["id"] == question_id:
                # Check if user response needs to be checked
                if question["check_user_response"] == 0:
                    return False
                else:
                    return True
    # Return False if question ID or stage is invalid
    return False


# Function to start the survey
def start_survey():
    # Create survey question vectordbs in local directory
    create_vectordbs(embedding_model=embedding_model)

    # Invoke LLM to ask the first question: What is your name?
    first_question = llm.invoke(
        f"[INST]I am starting to answer a survey. Greet me and ask me what my name is.[/INST]"
    )

    # Create a json file to store the survey history
    history = pd.DataFrame(
        {"id": [1], "question": ["What is your name?"], "user_response": [""]}
    )
    history.to_json("history.json", orient="records")

    # Return first question id and llm generated question
    return 1, first_question


# Function to end the survey
def end_survey():
    end_message = """
    It was interesting to get to know more about you!Thank you for participating in the survey!\n
    If you have any further questions or feedback, feel free to reach out to us.
    """
    # TO DO: Add survey history to mysql database
    # TO DO: Generate a LLM summary of the survey responses by user in the form of a personality test result

    # Remove created files and directories during the survey
    if os.path.exists("demographic_questions"):
        shutil.rmtree("demographic_questions/")
    if os.path.exists("stage_0_questions"):
        shutil.rmtree("stage_0_questions/")
    if os.path.exists("stage_1_questions"):
        shutil.rmtree("stage_1_questions/")
    if os.path.exists("stage_2_questions"):
        shutil.rmtree("stage_2_questions/")
    if os.path.exists("stage_3_questions"):
        shutil.rmtree("stage_3_questions/")
    if os.path.exists("history.json"):
        os.remove("history.json")

    # Return end message
    return end_message


# Function to ask the next survey question
def get_question_id_and_llm_response(
    user_response: str, stage: int
):  # prev_question_id

    # Load in survey history
    history = pd.read_json("history.json")

    # TO DO: Check if previous question requires an evaluation check
    # prev_question_id = history.loc[history.index[-1], "id"]
    # needCheck = checkUserResponse(prev_question_id, stage)
    # if needCheck:
    #     pass

    # Add user response to history
    history.loc[history.index[-1], "user_response"] = user_response

    # Get the vectordb of current survey stage
    db = get_vectorstore(stage)

    # Go to next stage if there are no more questions in the current vectordb
    if len(db.docstore._dict) == 0:
        # If survey is at stage 3, end survey
        if stage == 3:
            llm_reply = end_survey()
            return -1, llm_reply

        db = get_vectorstore(stage + 1)
        stage += 1

    # Retrieve the next best question with RAG chain
    retriever = get_retriever(db)
    rag_chain = get_rag_chain(retriever)
    prev_question = history.loc[history.index[-1], "question"]
    llm_reply, next_question_document, next_question_id = get_llm_outputs(
        rag_chain, user_response, prev_question
    )

    # Remove asked question from the vectordb
    remove_question_from_db(db, next_question_document, stage)

    # Saving the question that the RAG chain has chosen to history
    new_row = pd.DataFrame(
        {
            "id": [next_question_id],
            "question": [next_question_document.page_content],
            "user_response": [""],
        }
    )
    history = pd.concat([history, new_row], ignore_index=True)
    history.to_json("history.json", orient="records")

    # Return next question id and LLM output
    return next_question_id, llm_reply
