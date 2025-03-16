import React, { useState, useRef } from "react";
import AWS from "aws-sdk";

const Adding = () => {
    const [date, setDate] = useState("2025-03-11");
    const [price, setPrice] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [guess, setGuess] = useState("");
    const voverDivRef = useRef(null); // Create a ref for `voverDiv`
    const [zIndex, setZIndex] = useState(100); // Default value

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleDateGuess = (event) => {
        setGuess(event.target.value);
    };

    const [isFormVisible, setFormVisible] = useState(false);
    const submitans = () => {
        setFormVisible(false);

        if (voverDivRef.current) {
            voverDivRef.current.style.zIndex = 0;
        }
    }
    const guessWho = () => {
        if (guess === process.env.REACT_APP_TESTRUNING) {
            setFormVisible(true);
            console.log('correct');
        } else {
            setFormVisible(false);
            console.log('not correct');
            if (voverDivRef.current) {
                voverDivRef.current.style.zIndex = 0;
            }
        }
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
                day: "numeric",
            }),
            value: price,
            option: selectedOption,
        };

        const s3 = new AWS.S3({
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
            region: process.env.REACT_APP_REGION,
        });


        const params = {
            Bucket: "your-bucket-name", // Replace with your bucket name
            Key: `${selectedOption || "default"}.json`, // File name in S3
            Body: JSON.stringify(dataToUpload),
            ContentType: "application/json",
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
                <div
                    className="vover"
                    id="voverDiv"
                    ref={voverDivRef}
                    style={{
                        position: "absolute", // Or 'fixed' if you want it to stay in the same spot during scrolling
                        top: "30px", // Adjusts the vertical position from the top of the screen
                        right: "10px", // Positions it towards the right corner
                        height: "500px",
                        width: "230px", // Optional width for sizing
                        zIndex: zIndex, // Keeps it on top of other elements
                    }}
                >

                    <br />
                    <input
                        id="guestt"
                        onChange={handleDateGuess}
                        placeholder="Enter price"
                    />
                    <button onClick={guessWho}>Click</button>
                    <form
                        className="hidform"
                        style={{ display: isFormVisible ? "flex" : "none" }}
                        onSubmit={handleSubmit}
                    >

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
                        />
                        <input
                            type="number"
                            id="priceInput"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder='enter Price ?'
                        />
                        <br />
                        <br />
                        <button type="submit" onClick={"submitans"}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Adding;
