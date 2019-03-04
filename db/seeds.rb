# Constants
NUM_USERS = 5
NUM_PORTFOLIOS = 3
NUM_BUILDINGS = 5
BUILDING_TYPES = [
  { name: 'Big Box Retail' },
  { name: 'Small Office' }
]
CATEGORIES = [
  { name: 'Spaces', description: 'Questions about the amount of space in your building' },
  { name: 'Lighting - Interior', description: 'Questions about the amount of light in your building' }
].freeze

# DO NOT CHANGE THE ORDER OF THESE QUESTIONS. IF YOU WANT TO ADD MORE, APPEND TO BOTTOM.
QUESTIONS = [
  { question:
    { question_type: 'FileOption', text: 'Please upload a file.', status: 'published', parameter: 'isupload' }
  },
  { question:
    { question_type: 'DropdownOption', text: 'Do you have a full set of building drawings available in electronic format you can share?', status: 'published', parameter: 'isupload' },
    options: [
      { option:
          {text: 'yes' },
        dep_questions: [
          {
            question:
              { question_type: 'FreeOption', text: 'Please upload building drawings.', status: 'published', parameter: 'upload_url', parent_option_type: 'DropdownOption' }
          }
        ]
      },
      { option: {text: 'no' }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'What is the area in ft2 of the office space?', status: 'published', parameter: 'cfs_area' },
    options: [
      { option:
          {min: 1, max: 100 },
        dep_questions: [
          {
            question:
              { question_type: 'RangeOption', text: 'What percentage of the office space is leased to tenants?', status: 'published', parameter: 'perc_os_tenents', parent_option_type: 'RangeOption' },
            options: [
              { option: { min: 1, max: 100 }}
            ]
          },
          {
            question:
              { question_type: 'RangeOption', text: 'What percentage of the office space is occupied by owner?', status: 'published', parameter: 'perc_os_owner', parent_option_type: 'RangeOption' },
            options: [
              { option: { min: 1, max: 100 }}
            ]
          }
        ]
      }
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the office space accounts for in the building in percentage.', status: 'published', parameter: 'perc_office_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the Back of House space accounts for in the building in percentage.', status: 'published', parameter: 'perc_boh_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the retail space accounts for in the building in percentage.', status: 'published', parameter: 'perc_ret_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the restaurant/dining/kitchen space accounts for in the building in percentage.', status: 'published', parameter: 'perc_din_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the data center space accounts for in the building in percentage.', status: 'published', parameter: 'perc_ds_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the garage space accounts for in the building in percentage.', status: 'published', parameter: 'perc_gar_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] },
  { question:
    { question_type: 'RangeOption', text: 'Please estimate how much space the garage space accounts for in the building in percentage.', status: 'published', parameter: 'perc_gar_space' },
    options: [
      { option: { min: 1, max: 100 }}
    ] }
].freeze

# Seed functions

def make_rmi_user
  1.upto(NUM_USERS) do |n|
    rmi_user = RmiUser.create(
      first_name: Faker::Name.unique.first_name,
      last_name: Faker::Name.unique.last_name,
      password: 'password',
      password_confirmation: 'password',
      phone: '11231231234',
      email: "rmi_user#{n}@test.com"
    )
    rmi_user.save
    printf("#{n}/#{NUM_USERS} RMI Users \r")
  end
  puts
end

def make_asset_manager
  1.upto(NUM_USERS) do |n|
    asset_manager = AssetManager.create(
      first_name: Faker::Name.unique.first_name,
      last_name: Faker::Name.unique.last_name,
      password: 'password',
      password_confirmation: 'password',
      phone: '11231231234',
      email: "asset_manager#{n}@test.com"
    )
    asset_manager.save
    printf("#{n}/#{NUM_USERS} Asset Managers \r")
  end
  puts
end

def make_portfolio
  count = 0
  total = AssetManager.all.count
  AssetManager.all.each do |a|
    portfolio = a.create_portfolio(
      name: Faker::Company.unique.name
    )
    portfolio.save
    count += 1
    printf("#{count}/#{total} Portfolios \r")
  end
  puts
end

def make_building_types
  count = 0
  total = BUILDING_TYPES.length
  BUILDING_TYPES.each do |b|
    building_type = BuildingType.create(b)
    building_type.save
    count += 1
    printf("#{count}/#{total} Building Types \r")
  end
  puts
end

def make_categories
  count = 0
  total = CATEGORIES.length * BUILDING_TYPES.length
  BuildingType.all.each do |bt|
    CATEGORIES.each do |c|
      category = Category.create(name: c[:name], building_type: bt)
      category.save
      count += 1
      printf("#{count}/#{total} Categories \r")
    end
  end
  puts
end

def make_questions_options
  count = 0
  total = BuildingType.all.count * QUESTIONS.length
  BuildingType.all.each do |b_type|
    QUESTIONS.each do |q|
      _make_question(q, b_type)
      count += 1
      printf("#{count}/#{total} Questions \r")
    end
  end
  puts
end

def _make_question(q_hash, b_type, category_id=nil)
  category_id ||= b_type.categories.sample.id
  q_hash[:question][:category_id] = category_id
  question = b_type.questions.create(q_hash[:question])
  question.status = 'published'
  question.save
  return if question.question_type == 'FreeOption' || question.question_type == 'FileOption'
  q_hash[:options].each do |o|
    option =
      case question.question_type
        when 'DropdownOption'
          question.dropdown_options.create(o[:option])
        when 'RangeOption'
          question.range_options.create(o[:option])
      end
    option.save
    if o.key?(:dep_questions)
      o[:dep_questions].each do |q|
        q[:question][:parent_option_id] = option.id
        q[:question][:parent_option_type] = option.class.name
        _make_question(q, b_type, category_id)
      end
    end
  end
end

def make_buildings
  count = 0
  total = Portfolio.all.count * NUM_BUILDINGS
  Portfolio.all.each do |p|
    1.upto(NUM_BUILDINGS) do
      building_type_id = rand(1..BuildingType.all.size)
      building = p.buildings.create(
        building_type_id: building_type_id,
        address: Faker::Address.street_address,
        city: Faker::Address.city,
        state: Faker::Address.state.tr(' ', '_'),
        zip: 12_345,
        name: Faker::Company.unique.name \
              + BuildingType.find(building_type_id).name
      )
      building.save
      count += 1
      printf("#{count}/#{total} Buildings \r")
    end
  end
  puts
end

def make_answers
  count = 0
  total = Building.all.count * QUESTIONS.length
  Building.all.each do |b|
    b.questions.each do |q|
      answer = Answer.new(building_id: b.id, question_id: q.id)
      case q.question_type
      when 'DropdownOption'
        answer[:selected_option_id] = q.dropdown_options.first.id
        answer[:text] = q.dropdown_options.first.text
      when 'RangeOption'
        answer[:selected_option_id] = q.range_options.last.id
        answer[:text] = 55
      when 'FreeOption'
        answer[:text] = 'Text free range answer'
      end
      answer.save
      count +=1
      printf("#{count}/#{total} Answers \r")
    end
  end
  puts
end

def make_building_operator
  1.upto(NUM_USERS) do |n|
    building_operator = BuildingOperator.create(
      first_name: Faker::Name.unique.first_name,
      last_name: Faker::Name.unique.last_name,
      password: 'password',
      password_confirmation: 'password',
      phone: '11231231234',
      email: "building_operator#{n}@test.com"
    )
    building_operator.save
    printf("#{n}/#{NUM_USERS} Building Operators \r")
  end
  puts
end

def make_delegations
  count = 0
  total = Answer.all.count * 2
  Answer.all.each do |answer|
    0.upto(2) do |n|
      delegation = Delegation.new
      delegation.source = BuildingOperator.all.sample
      delegation.building_operator = BuildingOperator.all.sample
      delegation.answer = answer
      delegation.status = n
      delegation.save
      count += 1
      printf("#{count}/#{total} Delegations \r")
    end
  end
  puts
end



# Run the seeds: DO NOT DISTURB THIS ORDER.
# To run additional seeds, add to THE BOTTOM of this list.
# Seeds run in top-bottom order, there is no pre-compile step.
make_rmi_user
make_asset_manager
make_portfolio
make_building_types
make_categories
make_questions_options
make_buildings
make_answers
make_building_operator
make_delegations
