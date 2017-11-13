class ManagerAbility < ApplicationRecord
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
    user ||= AssetManager.new

    alias_action :create, :read, :update, :destroy, :download, to: :crud

    can :crud, Portfolio do |portfolio|
      portfolio.asset_manager_id = user.id
    end

    cannot :index, Portfolio

    can :crud, Building do |building|
      user.portfolios.include?(building.portfolio)
    end

    cannot :index, Building

    can :update, Answer do |answer|
      user.answer.include?(answer) && answer.text != 'delegated'
    end

    can :read, Answer do |answer|
      user.answer.include?(answer)
    end

    can :read, Question do |question|
      user.read_question(question)
    end

  end
end
