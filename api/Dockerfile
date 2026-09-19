FROM python:3.10-slim
WORKDIR /app
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY api/app.py .
COPY model/cnn_model.h5 /app/model/cnn_model.h5
EXPOSE 5000
CMD ["python3", "app.py"]
