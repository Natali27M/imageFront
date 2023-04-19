import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import Image from 'next/image';

const DropZone = ({
                      title,
                      heading,
                      subHeading,
                      name,
                      website,
                      description,
                      royalties,
                      fileSize,
                      category,
                      properties,
                      uploadToIPFS,
                      setImage,
                  }) => {
    const [fileUrl, setFileUrl] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0]);
        setFileUrl(url);
        setImage(url);
        console.log(url);
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });
    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                    <p>{title}</p>
                    <div>
                        {/*<Image*/}
                        {/*    src={'https://replicate.delivery/pbxt/6TMsm5aS6Q4nC11rzg9Q5SgxgrTrUE8d6KTZbSMzEfOlesxQA/out-0.png'}*/}
                        {/*    alt="upload"*/}
                        {/*    width={100}*/}
                        {/*    height={100}*/}
                        {/*    objectFit="contain"*/}
                        {/*    // className={Style.DropZone_box_input_img_img}*/}
                        {/*/>*/}
                    </div>
                    <p>{heading}</p>
                    <p>{subHeading}</p>
                </div>
            </div>

            {fileUrl && (
                <aside>
                    <div>
                        {/*<Image src={fileUrl} alt="nft image" width={200} height={200} />*/}

                        <div>
                            <div>
                                <p>
                                    <samp>NFT Name:</samp>
                                    {name || ""}
                                </p>
                                <p>
                                    <samp>Website:</samp>
                                    {website || ""}
                                </p>
                            </div>

                            <div>
                                <p>
                                    <span>Description</span>
                                    {description || ""}
                                </p>
                            </div>

                            <div>
                                <p>
                                    <span>Royalties</span>
                                    {royalties || ""}
                                </p>
                                <p>
                                    <span>FileSize</span>
                                    {fileSize || ""}
                                </p>
                                <p>
                                    <span>Properties</span>
                                    {properties || ""}
                                </p>
                                <p>
                                    <span>Category</span>
                                    {category || ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default DropZone;
