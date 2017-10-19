class Api::QuestionsController < ApplicationController
  def create
    @question = Question.new(question_params)
    if @question.save
      render_json_message(:ok, message: "New Question: #{@question.id} created", data: @question)
    else
      render_json_message(:forbidden, data: @question, errors: @question.errors.full_messages)
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(answer_params)
      render_json_message(:ok, message: "Question #{@question.id} successfully updated", data: @question)
    else
      render_json_message(:forbidden, data: @question, errors: @question.errors.full_messages)
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    if @question.destroyed?
      render_json_message(:ok, message: "Question #{@question.id} successfully destroyed", data: @question)
    else
      render_json_message(:forbidden, data: @question, errors: @question.errors.full_messages)
    end
  end

  def publish
    @question = Question.find(params[:id])
    @question.publish
    if @question.status == :published
      render_json_message(:ok, message: "Question #{@question.id} successfully published", data: @question)
    else
      render_json_message(:forbidden, data: @question, errors: @question.errors.full_messages)
    end
  end

  def question_params
    params.require(:question).permit(:text, :question_type, :status, :building_type, :category)
  end

end
