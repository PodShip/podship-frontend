import { gql } from "@apollo/client";

export const GET_ACTIVE_ITEM = gql`
    {
        podSales(
            first: 4
            orderBy: startTime
            orderDirection: desc
            where: { isOnSale: true, podcast_: { metadataURI_not: null } }
        ) {
            id
            auctionId
            podcast {
                id
                metadataURI
                baseURI
                ownerAddress {
                    id
                }
                created
            }
            amount
            isOnSale
        }
    }
`;

export const GET_EXPLORE_PAGE_ITEMS = gql`
    {
        podSales(
            first: 8
            orderBy: startTime
            orderDirection: desc
            where: { isOnSale: true, podcast_: { metadataURI_not: null } }
        ) {
            id
            auctionId
            podcast {
                id
                metadataURI
                baseURI
                ownerAddress {
                    id
                }
                created
            }
            amount
            isOnSale
        }
    }
`;

export const GET_SUPPORTERS_WINNERS = gql`
    {
        supporterNFTs(
            first: 1
            orderBy: created
            orderDirection: desc
            where: { ownerAddress_: { isRecentWinner: true } }
        ) {
            id
            metadataURI
            created
            ownerAddress {
                id
                isRecentWinner
            }
        }
    }
`;

export const GET_SUPPORTERS = gql`
    {
        supporterNFTs(first: 7, orderBy: created, orderDirection: desc) {
            id
            metadataURI
            created
            ownerAddress {
                id
            }
            creator {
                id
            }
        }
    }
`;
