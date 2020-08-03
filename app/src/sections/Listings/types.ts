export interface Listing {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
  }
  
  export type ListingsData = {
    listings: Listing[];
  };
  
  // Create 
  export interface CreateListingData {
    input: CreateListingVariables;
  }
  export interface CreateListingVariables {
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
  }
  // End Create

  export interface DeleteListingData {
    deleteListing: Listing;
  }
  
  export interface DeleteListingVariables {
    id: string;
  }