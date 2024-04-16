# Importing required modules from langchain package
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS


stage_0_questions = [
        #{'id': 1, 'question': "What is your name?", "check_user_response": 0},   # This question is taken out and assumed as the first survey question
        {'id': 2, 'question': "What is your age group?", "check_user_response": 0},
        {'id': 3, 'question': "what is your gender identity?", "check_user_response": 0},
]
stage_1_questions = [
        {'id': 4, 'question': "What is your hair length?", "check_user_response": 0},
        {'id': 5, 'question': "What is your hair type?", "check_user_response": 0},
        {'id': 6, 'question': "What are your hair concerns?", "check_user_response": 0},
        {'id': 7, 'question': "What is your scalp type?", "check_user_response": 0},
        {'id': 8, 'question': "What are your scalp concerns?", "check_user_response": 0},
        {'id': 9, 'question': "What hair treatments have you done?", "check_user_response": 0},
]
stage_2_questions = [
        {'id': 10, 'question': "How often do you wash your hair?", "check_user_response": 0},
        {'id': 11, 'question': "What hair products do you use regularly?", "check_user_response": 0},
        {'id': 12, 'question': "What hair styling products do you use regularly?", "check_user_response": 0},
        {'id': 13, 'question': "How often do you switch hair product brands?", "check_user_response": 0},
        {'id': 14, 'question': "How often do you visit hair salons or barber shops?", "check_user_response": 0},
        {'id': 15, 'question': "What is your ideal hair goal?", "check_user_response": 0},
        {'id': 16, 'question': "How important is hair health to you?", "check_user_response": 0},
]
stage_3_questions = [
        #{'id': 17, 'question': "Which of the following Pantene product series (collections) are you aware of?", "check_user_response": 0},
        {'id': 18, 'question': "From where did you know pantene?", "check_user_response": 0},
        {'id': 19, 'question': "What is your favorite pantene product and what do you like about it?", "check_user_response": 0},
        {'id': 20, 'question': "what is your least favorite pantene product and what do you dislike about it?", "check_user_response": 0},
        {'id': 21, 'question': "How would you rate the overall effectiveness of your favourite Pantene product? (scale: 1-5)", "check_user_response": 0},
        {'id': 22, 'question': "Would you recommend your current hair products to others? Why?", "check_user_response": 1},
        {'id': 23, 'question': "What hair product improvements would you like to see in the future?", "check_user_response": 1},
]
stage_4_questions = [
        {'id': 24, 'question': "When choosing hair products, how important are the following factors to you?", "check_user_response": 0},
        {'id': 25, 'question': "What is your preferred price range for hair products?", "check_user_response": 0},
        {'id': 26, 'question': "Do you prefer to purchase hair products online or in-store? If in-store, which stores?", "check_user_response": 1},
]


def create_vectordbs(embedding_model):
    """
    Create and save vector databases for survey questions.

    Parameters:
        embedding_model (EmbeddingModel): An embedding model used for vectorization.

    Returns:
        None

    Note:
        This function creates and saves separate vector databases for different stages
        of survey questions using the provided embedding model.

    Example:
        create_vectordbs(embedding_model)
    """
    # Creating Document objects for stage 0 survey questions
    stage_0_documents = [
        Document(
            page_content=question['question'],
            metadata={
                "id": question['id'],
                "stage": 0,
                "check": question['check_user_response']
            }
        ) for question in stage_0_questions
    ]
    # Creating Document objects for stage 1 survey questions
    stage_1_documents = [
        Document(
            page_content=question['question'],
            metadata={
                "id": question['id'],
                "stage": 1,
                "check": question['check_user_response']
            }
        ) for question in stage_1_questions
    ]
    # Creating Document objects for stage 2 survey questions
    stage_2_documents = [
        Document(
            page_content=question['question'],
            metadata={
                "id": question['id'],
                "stage": 2,
                "check": question['check_user_response']
            }
        ) for question in stage_2_questions
    ]
    # Creating Document objects for stage 3 survey questions
    stage_3_documents = [
        Document(
            page_content=question['question'],
            metadata={
                "id": question['id'],
                "stage": 3,
                "check": question['check_user_response']
            }
        ) for question in stage_3_questions
    ]
    # Creating Document objects for stage 4 survey questions
    stage_4_documents = [
        Document(
            page_content=question['question'],
            metadata={
                "id": question['id'],
                "stage": 4,
                "check": question['check_user_response']
            }
        ) for question in stage_4_questions
    ]

    # Creating vector databases for the documents/survey questions
    stage_0_db = FAISS.from_documents(
        stage_0_documents,
        embedding=embedding_model,
    )
   # Saving the vector database for stage 0 questions
    stage_0_db.save_local("stage_0_questions")
    
    # Creating vector databases for stage 1 to stage 4 questions
    stage_1_db = FAISS.from_documents(
        stage_1_documents,
        embedding=embedding_model,
    )
    stage_1_db.save_local("stage_1_questions")
    stage_2_db = FAISS.from_documents(
        stage_2_documents,
        embedding=embedding_model,
    )
    stage_2_db.save_local("stage_2_questions")
    stage_3_db = FAISS.from_documents(
        stage_3_documents,
        embedding=embedding_model,
    )
    stage_3_db.save_local("stage_3_questions")
    stage_4_db = FAISS.from_documents(
        stage_4_documents,
        embedding=embedding_model,
    )
    stage_4_db.save_local("stage_4_questions")