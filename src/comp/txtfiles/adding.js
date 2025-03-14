import React, { useState } from "react";
import AWS from "aws-sdk";

const Adding = () => {
    const [date, setDate] = useState("2025-03-11");
    const [price, setPrice] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToUpload = {
            date: new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            }),
            value: price,
            option: selectedOption
        };

        // Configure AWS S3
        const s3 = new AWS.S3({
            accessKeyId: "YOUR_ACCESS_KEY_ID", // Replace with your Access Key ID
            secretAccessKey: "YOUR_SECRET_ACCESS_KEY", // Replace with your Secret Access Key
            region: "YOUR_REGION" // Replace with your S3 bucket region
        });

        const params = {
            Bucket: "your-bucket-name", // Replace with your bucket name
            Key: `${selectedOption || "default"}.json`, // File name in S3
            Body: JSON.stringify(dataToUpload),
            ContentType: "application/json"
        };

        try {
            const result = await s3.upload(params).promise();
            console.log("File uploaded successfully:", result.Location);
            alert("Data successfully uploaded to S3!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload data to S3.");
        }
    };

    return (
        <div className="news-listings" style={{ padding: "20px" }}>
            <div className="joiner">
                <div>
                    <h1>Local News</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <select
                        id="options"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="" disabled>
                            Select file
                        </option>
                        <option value="ftse">FTSE</option>
                        <option value="bitcoin">Bitcoin</option>
                    </select>
                    <input
                        type="date"
                        id="dateInput"
                        value={date}
                        onChange={handleDateChange}
                        placeholder="Enter date"
                    />
                    <input
                        type="number"
                        id="priceInput"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Enter price"
                    />
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Adding;
