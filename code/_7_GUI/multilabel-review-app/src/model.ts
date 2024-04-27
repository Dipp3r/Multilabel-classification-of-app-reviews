import * as torch from 'torch';
import * as np from "numpy";
import { AutoModelForSequenceClassification, AutoTokenizer } from 'transformers';

// Load the tokenizer
const tokenizer = AutoTokenizer.from_pretrained("../_5_model_selection/Model/BiGRU-Bert");

// Load the model
const model = AutoModelForSequenceClassification.from_pretrained("../_5_model_selection/Model/BiGRU-Bert");

function Classsify(text: string): string[] {
    const encoding = tokenizer(text, { return_tensors: "pt" });
    const outputs = model(encoding);

    const logits = outputs.logits;

    const sigmoid = new torch.nn.Sigmoid();
    const probs = sigmoid(logits.squeeze());
    const predictions = np.zeros(probs.shape);
    predictions[np.where(probs.greaterEqual(0.5))] = 1;

    const predictedLabels: string[] = [];
    for (let idx = 0; idx < predictions.length; idx++) {
        if (predictions[idx] === 1.0) {
            predictedLabels.push(id2label[idx]); // Assuming id2label is defined elsewhere
        }
    }

    return predictedLabels;
}

export default Classsify