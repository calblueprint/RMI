class Api::QuestionsController < ApplicationController
  def create
    @question = Question.new(question_params)
    if @question.save
      render_json_message(:ok, message: "New Question: #{@question.id} created", data: @question)
    else
      render_json_message(:forbidden,errors: @question.errors.full_messages)
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(answer_params)
      render_json_message(:ok, message: "Question #{@question.id} successfully updated", data: @question)
    else
      render_json_message(:forbidden, errors: @question.errors.full_messages)
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    if @question.destroyed?
      render_json_message(:ok, message: "Question #{@question.id} successfully destroyed", data: @question)
    else
      render_json_message(:forbidden, errors: @question.errors.full_messages)
    end
  end

  def publish
    @questions = Question.find(params[:ids])
    if @questions.update_all(status: :published)
      render_json_message(:ok, message: "Questions successfully published", data: @questions)
    else
      render_json_message(:forbidden, errors: "Statement is Invalid or Server Error, Questions not published")
    end

  end

  params.require(:question).permit(
      :text,
      :question_type,
      :status,
      :building_type,
      :category
  )

end
