class Api::QuestionsController < ApplicationController
  # load_and_authorize_resource

  def create
    question = Question.new(question_params)
    if question.save
      new_question = QuestionSerializer.new(question)
      render_json_message(:ok, message: "New Question: #{question.id} created", data: new_question)
    else
      render_json_message(:forbidden, errors: question.errors.full_messages)
    end
  end

  def show
    question = Question.find(params[:id])
    render json: question
  end

  def update
    question = Question.find(params[:id])
    if question.update(question_params)
      updated_question = QuestionSerializer.new(question)
      render_json_message(:ok, message: "Question #{question.id} successfully updated", data: updated_question)
    else
      render_json_message(:forbidden, errors: question.errors.full_messages)
    end
  end

  def destroy
    question = Question.find(params[:id])
    question.destroy
    if question.destroyed?
      render_json_message(:ok, message: "Question #{question.id} successfully destroyed")
    else
      render_json_message(:forbidden, errors: question.errors.full_messages)
    end
  end

  def publish
    questions = Question.find(params[:ids])
    if questions.update_all(status: :published)
      render_json_message(:ok, message: "Questions successfully published", data: questions)
    else
      render_json_message(:forbidden, errors: "Statement is Invalid or Server Error, Questions not published")
    end
  end

  private

  def question_params
    params.require(:question)
          .permit(
            :text,
            :question_type,
            :status,
            :building_type_id,
            :category_id,
            :parent_option_type,
            :parent_option_id,
            :parameter
          )
  end
end
