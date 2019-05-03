class PortfolioSerializer < ActiveModel::Serializer
  attributes :id
  			 :asset_manager_emails
  			 :name
  			 :asset_managers

  def asset_manager_emails
  	object.asset_managers.emails
  end
end
