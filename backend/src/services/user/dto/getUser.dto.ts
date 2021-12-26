import {UserAttributes} from "../../../models/User";

type protectedProperties = "password";
export interface GetUserDto extends Omit<UserAttributes, protectedProperties> {}
export interface LoginUserDto {
  email: string,
  password: string
}

export const getUserDto = (user: UserAttributes): GetUserDto => {
  const userData: Partial<UserAttributes> = {
    ...user
  }

  delete userData.password;

  return userData as GetUserDto;
}