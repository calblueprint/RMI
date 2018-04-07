class Api::RangeOptionsController < ApplicationController

  def create
    range_option = RangeOption.new(range_option_params)
    if range_option.save
      render_json_message(:ok, message: "New RangeOption: #{range_option.id} created", data: range_option)
    else
      render_json_message(:forbidden, errors: range_option.errors.full_messages)
    end
  end

  def show
    range_option = RangeOption.find(params[:id])
    render json: range_option
  end

  def update
    range_option = RangeOption.find(params[:id])
    if range_option.update(range_option_params)
      render_json_message(:ok, message: "Question #{range_option.id} successfully updated", data: range_option)
    else
      render_json_message(:forbidden, errors: range_option.errors.full_messages)
    end
  end

  def destroy
    range_option = Question.find(params[:id])
    range_option.destroy
    if range_option.destroyed?
      render_json_message(:ok, message: "Question #{range_option.id} successfully destroyed")
    else
      render_json_message(:forbidden, errors: range_option.errors.full_messages)
    end
  end

  private

  def range_option_params
    params.require(:range_option)
      .permit(
        :min,
        :max,
        :question_id,
        :unit
      )
  end
end
