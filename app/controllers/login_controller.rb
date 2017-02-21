class LoginController < ApplicationController
  layout "empty"


  def access
    unless session[:email].present?
      render 'login/access'
    end
  end

end