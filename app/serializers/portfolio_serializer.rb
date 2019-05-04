class PortfolioSerializer < ActiveModel::Serializer
  attributes :id
  			 :asset_manager_emails
  			 :name

  def asset_manager_emails
  	puts "emails!!!!!!!!"
  	emails = []
  	object.asset_managers.each do |a|
  		emails.push(a.email)
  	end
  	emails
  end
end
