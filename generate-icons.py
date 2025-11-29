#!/usr/bin/env python3
"""
Script para generar iconos PNG e ICO desde SVG
Requiere: pip install pillow cairosvg
"""

try:
    from PIL import Image
    import cairosvg
    import io

    def svg_to_png(svg_file, png_file, size):
        """Convierte SVG a PNG con el tamaño especificado"""
        png_data = cairosvg.svg2png(url=svg_file, output_width=size, output_height=size)
        with open(png_file, 'wb') as f:
            f.write(png_data)
        print(f"✓ Creado: {png_file} ({size}x{size})")

    def create_ico(png_file, ico_file):
        """Convierte PNG a ICO"""
        img = Image.open(png_file)
        img.save(ico_file, format='ICO', sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)])
        print(f"✓ Creado: {ico_file}")

    # Generar iconos
    print("Generando iconos...")
    svg_to_png('assets/icon.svg', 'assets/icon.png', 256)
    svg_to_png('assets/icon.svg', 'assets/tray-icon.png', 64)
    create_ico('assets/icon.png', 'assets/icon.ico')
    print("\n✓ Todos los iconos generados correctamente!")

except ImportError as e:
    print("Error: Faltan dependencias.")
    print("Instala con: pip install pillow cairosvg")
    print(f"Detalle: {e}")
    exit(1)
