import axios from 'axios';
import { isValidUrl } from './checkURL';

const input = document.querySelector("form input");
const form = document.querySelector("form");
const error = document.querySelector("#error");
const agreement = document.getElementById("agreement");
const subjectivity = document.getElementById("subjectivity");
const confidence = document.getElementById("confidence");
const irony = document.getElementById("irony");
const score_tag = document.getElementById("score_tag");
const results = document.querySelectorAll("#results div");

document.addEventListener('DOMContentLoaded', () => {
    if (error) {
        error.style.display = "none";
    }
});

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidUrl(input.value)) {
        show_error("Please enter a valid URL.");
        return;
    }

    try {
        const { data } = await axios.post('http://localhost:8000/', {
            input: input.value 
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { msg, sample } = data;
        if (msg) {
            show_error(msg);
            return;
        }
        show_results(sample);
    } catch (error) {
        show_error("An error occurred while processing your request.");
        console.error('Error during Axios request:', error);
    }
};

const show_error = (msg) => {
    if (error) {
        error.style.display = "block"; 
        results.forEach(result => {
            result.style.display = "none";
        });
        error.innerHTML = msg;
    }
};

const show_results = (sample) => {
    if (error) {
        error.style.display = "none"; 
    }
    results.forEach(result => {
        result.style.display = "block";
    });
    agreement.innerHTML = `Agreement: ${sample.agreement}`;
    subjectivity.innerHTML = `Subjectivity: ${sample.subjectivity}`;
    confidence.innerHTML = `Confidence: ${sample.confidence}`;
    irony.innerHTML = `Irony: ${sample.irony}`;
    score_tag.innerHTML = `Score Tag: ${sample.score_tag}`;
};

export { handleSubmit };