// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage";

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from "mime";

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = `${process.env.NFT_STORAGE}`;

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} file the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
async function storeNFT(audioFile, imagefile, data) {
    // load the file from disk
    const animation_url = await fileFromPath(audioFile);
    const image = await fileFromPath(imagefile);

    console.log(NFT_STORAGE_KEY);

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

    console.log({ audioFile, imagefile, data });
    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name: data.podcastName,
        description: data.desc,
        animation_url,
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
    return new File([file], file.name.replace(" ", ""), { type });
}

async function upload(file, name, description) {
    const result = await storeNFT(file, name, description);
    console.log(result);
    return result;
}

export default upload;
