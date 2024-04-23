# Importing required modules from langchain package
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS

# Import necessary packages
import yaml

# Load YAML file
with open('backend testing/config.yaml', 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)


def create_vectordbs(embedding_model):
    """
    This function iterates over the survey stages in the provided config,
        creating and saving separate vector databases for different stages
        of survey questions using the provided embedding model. It also extracts
        the first question of each stage and returns it as a dictionary.

    Parameters:
        embedding_model (EmbeddingModel): An embedding model used for vectorization.

    Returns:
        dict: Dictionary containing variables for the first question of each stage.
    """
    # Initialise dictionary to store first stage questions
    first_stage_questions = {}

    # Iterate over survey stages in the config
    for stage in config["survey_stages"]:
        # List to store Document objects for the current stage
        stage_documents = []

        # Iterate over questions in the current stage
        for question in stage['questions']:
            # Check if the current question is the first question of the stage
            if question.get("first_question_of_stage", False):
                # Add the first question of the stage to the dictionary
                first_stage_questions[stage["stage"]] = question
            else:
                # Create a Document object for the current question and add it to the list
                stage_documents.append(
                    Document(
                        page_content=question['question'],
                        metadata={
                            "id": question['id'],
                            "stage": stage['stage'],
                        }
                    )
                ) 
        # Creating vector databases for the documents/survey questions
        stage_db = FAISS.from_documents(
            stage_documents,
            embedding=embedding_model,
        )
        # Saving the vector database for the current stage questions
        stage_db.save_local(f"stage_{stage['stage']}_questions")

    return first_stage_questions