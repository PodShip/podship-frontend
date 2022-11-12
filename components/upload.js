// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage";

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from "mime";

// The 'fs' builtin module on Node.js provides access to the file system
import fs from "fs";

// The 'path' module provides helpers for manipulating filesystem paths
import path from "path";

require("dotenv").config();

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = `${process.env.NFT_STORAGE}`;

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} file the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFT(file, name, description) {
    // load the file from disk
    const image = file; //await fileFromPath(imagePath);

    console.log(NFT_STORAGE_KEY);

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    });
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} file the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(file) {
    // const content = await fs.promises.readFile(file);
    const type = mime.getType(file);
    return new File([content], path.basename(file), { type });
}

/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeNFT.
 *
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
async function upload(file, name, description) {
    // const args = process.argv.slice(2);
    // if (args.length !== 3) {
    //     console.error(
    //         `usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`
    //     );
    //     process.exit(1);
    // }

    // const [file, name, description] = args;
    const result = await storeNFT(file, name, description);
    console.log(result);
}

// // Don't forget to actually call the main function!
// // We can't `await` things at the top level, so this adds
// // a .catch() to grab any errors and print them to the console.
// main().catch((err) => {
//     console.error(err);
//     process.exit(1);
// });

export default upload;
