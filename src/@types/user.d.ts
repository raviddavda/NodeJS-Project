type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IImage = {
  url: string;
  alt: string;
};

type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

type IUser = {
  name: IName;
  address: IAddress;
  image?: IImage;
  email: string;
  phone: string;
  password: string;
  isBusiness: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
};

type IBusiness = {
  isBusiness: boolean;
};

export { IName, IImage, IAddress, IUser, ILogin, IJWTPayload, IBusiness };
