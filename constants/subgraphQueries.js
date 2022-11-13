import { gql } from "@apollo/client";

export const GET_ACTIVE_ITEM = gql`
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
            created
        }
    }
`;

export const GET_EXPLORE_PAGE_ITEMS = gql`
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
            first: 8
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
            created
        }
    }
`;
