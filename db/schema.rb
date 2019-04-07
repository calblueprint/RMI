# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_07_011819) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_abilities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "answers", force: :cascade do |t|
    t.string "text", default: ""
    t.bigint "building_id"
    t.bigint "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "selected_option_id"
    t.string "attachment_file_name"
    t.string "attachment_content_type"
    t.bigint "attachment_file_size"
    t.datetime "attachment_updated_at"
    t.string "delegation_email"
    t.string "delegation_first_name"
    t.string "delegation_last_name"
    t.index ["building_id"], name: "index_answers_on_building_id"
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "asset_managers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_asset_managers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_asset_managers_on_reset_password_token", unique: true
  end

  create_table "building_operator_assignments", id: false, force: :cascade do |t|
    t.bigint "building_id", null: false
    t.bigint "building_operator_id", null: false
    t.index ["building_id", "building_operator_id"], name: "by_op_on_building"
    t.index ["building_operator_id", "building_id"], name: "by_building_on_op"
  end

  create_table "building_operators", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_email_received"
    t.index ["email"], name: "index_building_operators_on_email", unique: true
    t.index ["reset_password_token"], name: "index_building_operators_on_reset_password_token", unique: true
  end

  create_table "building_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "buildings", force: :cascade do |t|
    t.string "name"
    t.bigint "portfolio_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "building_type_id"
    t.string "address"
    t.string "city"
    t.integer "state"
    t.integer "zip"
    t.index ["building_type_id"], name: "index_buildings_on_building_type_id"
    t.index ["portfolio_id"], name: "index_buildings_on_portfolio_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "building_type_id"
    t.string "description"
    t.index ["building_type_id"], name: "index_categories_on_building_type_id"
  end

  create_table "delegations", force: :cascade do |t|
    t.bigint "answer_id"
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "source_id"
    t.bigint "building_operator_id"
    t.index ["answer_id"], name: "index_delegations_on_answer_id"
    t.index ["building_operator_id"], name: "index_delegations_on_building_operator_id"
    t.index ["source_id"], name: "index_delegations_on_source_id"
  end

  create_table "dropdown_options", force: :cascade do |t|
    t.string "text"
    t.bigint "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_dropdown_options_on_question_id"
  end

  create_table "file_options", force: :cascade do |t|
    t.bigint "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_file_options_on_question_id"
  end

  create_table "manager_abilities", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "portfolios", force: :cascade do |t|
    t.string "name"
    t.bigint "asset_manager_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_manager_id"], name: "index_portfolios_on_asset_manager_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer "question_type"
    t.bigint "building_type_id"
    t.string "parent_option_type"
    t.bigint "parent_option_id"
    t.bigint "category_id"
    t.string "text"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "parameter", null: false
    t.text "helper_text"
    t.string "unit"
    t.index ["building_type_id"], name: "index_questions_on_building_type_id"
    t.index ["category_id"], name: "index_questions_on_category_id"
    t.index ["parent_option_type", "parent_option_id"], name: "index_questions_on_parent_option_type_and_parent_option_id"
  end

  create_table "range_options", force: :cascade do |t|
    t.integer "min"
    t.integer "max"
    t.bigint "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_range_options_on_question_id"
  end

  create_table "rmi_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_rmi_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_rmi_users_on_reset_password_token", unique: true
  end

  add_foreign_key "answers", "buildings"
  add_foreign_key "answers", "questions"
  add_foreign_key "buildings", "building_types"
  add_foreign_key "buildings", "portfolios"
  add_foreign_key "categories", "building_types"
  add_foreign_key "delegations", "answers"
  add_foreign_key "delegations", "building_operators"
  add_foreign_key "delegations", "building_operators", column: "source_id"
  add_foreign_key "dropdown_options", "questions"
  add_foreign_key "file_options", "questions"
  add_foreign_key "portfolios", "asset_managers"
  add_foreign_key "questions", "building_types"
  add_foreign_key "questions", "categories"
  add_foreign_key "range_options", "questions"
end
