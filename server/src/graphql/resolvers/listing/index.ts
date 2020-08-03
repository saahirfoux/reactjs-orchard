import { IResolvers } from "apollo-server-express";
import { Database, Listing, AddListingArgs, AddListingInput } from "../../../lib/types";
import { ObjectId } from "mongodb";

const verifyHostListingInput = ({
    title,
    address,
    rating,
    price
  }: AddListingInput) => {
    if (title.length > 100) {
      throw new Error("listing title must be under 100 characters");
    }
    if (address.length > 5000) {
      throw new Error("listing description must be under 5000 characters");
    }
    if (price < 0) {
      throw new Error("price must be greater than 0");
    }
    if (rating > 5) {
      throw new Error("rating must be less than 6");
    }
  };

export const listingResolvers: IResolvers = {
    Query: {
        listings: async (
            _root: undefined,
            _args: {},
            { db }: { db: Database }
        ): Promise<Listing[]> => {
            
            return await db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing: async (
            _root: undefined,
            { id }: { id: string },
            { db }: { db: Database }
            ): Promise<Listing> => {
            const deleteRes = await db.listings.findOneAndDelete({
                _id: new ObjectId(id)
            });

            if (!deleteRes.value) {
                throw new Error("failed to delete listing");
            }

            return deleteRes.value;
        },
        createListing: async (
                _root: undefined,
                { input }: AddListingArgs,
                { db, req }: {db: Database; req: Request }
            ): Promise<Listing> => {
                
                verifyHostListingInput(input);

                const insertResult = await db.listings.insertOne({
                    _id: new ObjectId(),
                    ...input
                  });
            
                const insertedListing: Listing = insertResult.ops[0];
                console.log(insertedListing, 'Listings inserted?');

                return insertedListing;
            }
    },
    Listing: {
        id: (listing: Listing): string => listing._id.toString()
    }
};

/*        createListing: async (
            { title }: { title: string },
            { image }: { image: string },
            { address }: { address: string },
            { price }: { price: number },
            { numOfGuests }: { numOfGuests: number },
            { numOfBeds }: { numOfBeds: number },
            { numOfBaths }: { numOfBaths: number },
            { rating }: { rating: number }

            ): (Promise<AddListingArgs>) => {
                console.log(title, 'The');

                return {
                    title: title,
                    image: image,
                    address: address,
                    price: price,
                    numOfGuests: numOfGuests,
                    numOfBeds: numOfBeds,
                    numOfBaths: numOfBaths,
                    rating: rating
                };
        }*/