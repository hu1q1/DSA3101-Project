# Import necessary packages
import yaml

# Import required modules from langchain 
from langchain_community.llms import HuggingFaceEndpoint
from langchain_community.embeddings import HuggingFaceEmbeddings

# Importing required modules from transformers package
from transformers import pipeline
from transformers.utils import logging
logging.set_verbosity_error() # Suppressing unnecessary logs from transformers package

# Import .env variables
import load_env

# Load YAML file
with open('backend testing/config.yaml', 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)
    

# Initialize the Language Model (LLM) using Hugging Face endpoint
ENDPOINT_URL = config["huggingface_llm"]["endpoint_url"]

# Define parameters for the Hugging Face endpoint
llm = HuggingFaceEndpoint(
    endpoint_url=ENDPOINT_URL,  # URL of the Hugging Face API endpoint
    task="text-generation",  # Specify the task for the model
    max_new_tokens=config["huggingface_llm"]["max_new_tokens"],  # Maximum number of tokens to generate
    top_k=config["huggingface_llm"]["top_k"],  # Top k words to sample
    temperature=config["huggingface_llm"]["temperature"],  # Controls randomness in sampling
    stop_sequences=config["huggingface_llm"]["stop_sequences"],  # Specify sequences to stop generation
    return_full_text=False,  # Specify whether to return the full generated text
    streaming=True,  # Enable streaming mode for efficient processing of long texts
)


# Initialize an embedding model from Hugging Face
embedding_model = HuggingFaceEmbeddings(
    model_name=config["huggingface_embeddingmodel"]["model_name"],  # Name of the pre-trained model to use for embeddings
    model_kwargs={"device": config["huggingface_embeddingmodel"]["device_for_inference"]},  # Specify device for inference (CPU in this case)
    encode_kwargs={
        "normalize_embeddings": config["huggingface_embeddingmodel"]["normalize_embeddings"]
    },  # Specify if embeddings should be normalized
)

# Initialise a sentiment model from Hugging Face with pipeline
pipe = pipeline(
        "text-classification", model=config["huggingface_sentimentmodel"]["model"]
    )
