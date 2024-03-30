import tkinter as tk
from tkinter import filedialog
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import PyPDF2

class TextbookQA:
    def __init__(self, master):
        self.master = master
        master.title("Textbook Question Answering System")
        
        self.text = None
        self.textbook_data = None
        self.tfidf_vectorizer = TfidfVectorizer()
        self.tfidf_matrix = None

        self.upload_button = tk.Button(master, text="Upload Textbook", command=self.upload_textbook)
        self.upload_button.pack()

        self.question_label = tk.Label(master, text="Enter your question:")
        self.question_label.pack()

        self.question_entry = tk.Entry(master, width=50)
        self.question_entry.pack()

        self.answer_button = tk.Button(master, text="Get Answer", command=self.get_answer)
        self.answer_button.pack()

        self.answer_label = tk.Label(master, text="")
        self.answer_label.pack()

    def upload_textbook(self):
        file_path = filedialog.askopenfilename(filetypes=[("PDF files", "*.pdf")])
        if file_path:
            with open(file_path, "rb") as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:  # Iterate over pages directly
                    text += page.extract_text()
                self.text = text
                self.textbook_data = self.text.split("\n\n")  # Split text into paragraphs or sections
                self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.textbook_data)


    def get_answer(self):
        if self.textbook_data is None:
            self.answer_label.config(text="Please upload a textbook first.")
            return

        question = self.question_entry.get()
        if not question:
            self.answer_label.config(text="Please enter a question.")
            return

        question_vector = self.tfidf_vectorizer.transform([question])
        similarities = cosine_similarity(question_vector, self.tfidf_matrix)
        most_similar_index = np.argmax(similarities)

        answer = self.textbook_data[most_similar_index]
        self.answer_label.config(text=answer)

def main():
    root = tk.Tk()
    app = TextbookQA(root)
    root.mainloop()

if __name__ == "__main__":
    main()
