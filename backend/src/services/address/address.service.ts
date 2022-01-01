import Address, {AddressCreationAttributes} from "../../models/Address";
import {CreateOptions} from "sequelize/dist/lib/model";
import NodeGeocoder from "node-geocoder";
import "dotenv/config";

export default class AddressService {
  private static options: NodeGeocoder.Options = {
    provider: "google",
    apiKey: process.env.GOOGLE_API_KEY
  }

  private static geocoder = NodeGeocoder(AddressService.options);

  static async createAddress(addressBody: AddressCreationAttributes, user: any, options: CreateOptions) {
    const address = await user.createAddress(addressBody, options);

    const geoLocation = await AddressService.geocoder.geocode(addressBody.street + " " + addressBody.city)

    if (!geoLocation) {
      return address
    }
    /** TBD handle undefined or wrong address*/
    const geo = await address.createGeo({
      lat: geoLocation[0].latitude,
      lng: geoLocation[0].longitude,
    }, options)

    return address
  }
}