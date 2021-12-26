import {UserAttributes} from "../../../models/User";

type protectedProperties = "password";
type getUserDto = Omit<UserAttributes, protectedProperties>

export const userDto = (user: UserAttributes): getUserDto => {
  const userData: Partial<UserAttributes> = {
    ...user
  }

  delete userData.password;

  return userData as getUserDto;
}