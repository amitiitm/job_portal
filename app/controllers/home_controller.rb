class HomeController < ApplicationController
 def index
    @message = params[:message]
    @products = Product.paginate(:page => params[:page], :per_page => 10)
 end

  def upload
    Product.upload(params[:file])
    redirect_to root_url(message:  "Products imported successfully.")
  end
end
