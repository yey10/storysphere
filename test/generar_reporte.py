import json
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

# Variables para guardar métricas
http_duration_value = None
total_checks = None

# Leer línea por línea el archivo JSON
with open("resultados.json", "r", encoding="utf-8") as f:
    for line in f:
        try:
            obj = json.loads(line)

            # Buscar métrica de duración HTTP
            if obj.get("metric") == "http_req_duration":
                http_duration_value = obj.get("data", {}).get("value", None)

            # Buscar métrica de checks
            elif obj.get("metric") == "checks":
                total_checks = obj.get("data", {}).get("value", None)

        except json.JSONDecodeError:
            continue

# Validar que se encontró la métrica de duración
if http_duration_value is None:
    print("❌ No se encontró la métrica 'http_req_duration'")
    exit()

# Crear gráfico con Matplotlib
plt.figure(figsize=(6, 4))
plt.bar(['Duración promedio'], [http_duration_value], color='skyblue')
plt.title("Duración Promedio de Peticiones HTTP")
plt.ylabel("Milisegundos")
plt.tight_layout()
plt.grid(True)
plt.savefig("grafico_duracion.png")
plt.close()

# Crear PDF con ReportLab
pdf = canvas.Canvas("reporte_k6.pdf", pagesize=A4)
width, height = A4

pdf.setTitle("Reporte de Pruebas K6")
pdf.setFont("Helvetica-Bold", 20)
pdf.drawString(50, height - 50, "📊 Reporte de Pruebas de Estrés (K6)")

# Datos generales de los checks
pdf.setFont("Helvetica", 12)
if total_checks is not None:
    pdf.drawString(50, height - 100, f"✔️ Total de Checks: {int(total_checks)}")
    pdf.drawString(50, height - 120, "✅ Checks Satisfactorios: No disponible")
    pdf.drawString(50, height - 140, "❌ Checks Fallidos: No disponible")
else:
    pdf.drawString(50, height - 100, "No se encontraron datos de 'checks'.")

# Insertar gráfico de barras en el PDF
pdf.drawImage("grafico_duracion.png", 50, height - 400, width=500, preserveAspectRatio=True)

# Finalizar PDF
pdf.showPage()
pdf.save()

print("✅ PDF generado: reporte_k6.pdf")
