class Api::CategoriesController < ApplicationController
  load_and_authorize_resource

  def create
    category = Category.new(category_params)
    if category.save
      new_category = CategorySerializer.new(category)
      render_json_message(:ok, message: "New Category: #{category.id} created", data: new_category)
    else
      render_json_message(:forbidden, errors: category.errors.full_messages)
    end
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def update
    category = Category.find(params[:id])
    if category.update(category_params)
      updated_category = CategorySerializer.new(category)
      render_json_message(:ok, message: "Category #{category.id} successfully updated", data: updated_category)
    else
      render_json_message(:forbidden, errors: category.errors.full_messages)
    end
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
    if category.destroyed?
      render_json_message(:ok, message: "Category #{category.id} successfully destroyed")
    else
      render_json_message(:forbidden, errors: category.errors.full_messages)
    end
  end

  private

  def category_params
    params.require(:category)
      .permit(
        :name,
        :building_type_id,
      )
  end
end
