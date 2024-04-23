import yaml

class QuestionManager:
    def __init__(self, config_file):
        self.question_checks = self.load_question_checks(config_file)

    def load_question_checks(self, config_file):
        with open(config_file, 'r') as file:
            config = yaml.safe_load(file)
        question_checks = {}
        for stage in config["survey_stages"]:
            for question in stage["questions"]:
                question_id = question["id"]
                check_required = question.get("check_user_response", False)
                question_checks[question_id] = check_required
        return question_checks

    def is_check_required(self, question_id):
        return self.question_checks.get(question_id, False)

question_manager = QuestionManager("backend testing/config.yaml")