class User < ActiveRecord::Base
  attr_accessor :token

  validates :email,:uniqueness => true
  validates :email, :presence => true
  validates :password, :presence => true
  validates :password, :confirmation => true, :presence => true, :on => :create

  scope :active, -> { where(status: ACTIVE_STATUS) }

  ROLES = {'Job Seeker' => 1,'Job Provider' => 2}

  before_create :encrypt_password


  def self.authenticate(username, password)
    password = User::encrypt(password)
    username.present? && password.present? ? self.where("(email = ?  OR mobile = ? )AND password = ?", username, username, password).first : nil
  end

  ## called from lab_order create to create doctor by lab guys
  def self.create_user(params)
    mobile = params[:mobile]
    name = params[:first_name].split(' ')
    first_name = name[0]
    last_name = name[1..4].join(' ')
    email = params[:email]
    password = params[:password]
    user = self.new(:email => email)
    user.first_name = first_name
    user.last_name = last_name
    user.mobile = mobile
    user.password = password
    user.role_id = params[:role_id]
    user
  end

  def self.encrypt(password)
    Digest::SHA1.hexdigest("#{password}")
  end
  protected
  def encrypt_password
    self.password = User.encrypt(self.password)
  end

end
