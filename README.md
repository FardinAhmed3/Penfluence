# Penfluence
Brooklyn College Hackathon Project

## How to get started
To install the required components to run the project, follow the steps

- Install node (if not already installed). Check your installation by typing `node -v` in your terminal

- Install python (if not already installed). Check your installation by typing `python` in your terminal

- Type the following on your terminal
### For backend (Windows specific Virtual Environment)
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
### For frontend
```
cd frontend
npm install next react react-dom --legacy-peer-deps
npm run dev
```


