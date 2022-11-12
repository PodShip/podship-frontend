import { gql } from "@apollo/client";

const GET_ACTIVE_ITEM = gql`
    {
        podSales(first: 5) {
            id
            podcast {
                id
            }
            amount
            isOnSale
        }
        podcasts(first: 5) {
            id
            metadataURI
            baseURI
            isOnSale
            ownerAddress {
                id
            }
        }
    }
`;

export default GET_ACTIVE_ITEM;
