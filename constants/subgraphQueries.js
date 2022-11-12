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
        podcasts(
            first: 4
            orderBy: created
            orderDirection: desc
            where: { metadataURI_not: null }
        ) {
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
