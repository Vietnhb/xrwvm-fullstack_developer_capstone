from flask import Flask
import json
app = Flask("Sentiment Analyzer")

@app.get('/')
def home():
    return "Welcome to the Sentiment Analyzer. \
    Use /analyze/text to get the sentiment"


@app.get('/analyze/<input_txt>')
def analyze_sentiment(input_txt):

    text = input_txt.lower()
    positive_words = ["fantastic", "great", "excellent", "good", "amazing"]
    negative_words = ["bad", "poor", "terrible", "awful", "worst"]
    res = "neutral"
    if any(word in text for word in positive_words):
        res = "positive"
    elif any(word in text for word in negative_words):
        res = "negative"
    res = json.dumps({"sentiment": res})
    print(res)
    return res


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
