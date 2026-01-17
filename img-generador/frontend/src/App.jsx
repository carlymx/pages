import { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('single');

  const [params, setParams] = useState({
    width: 256,
    height: 256,
    bgColor: '#000000',
    fgColor: '#ffffff',
    shapes: ['circle'],
    patterns: ['dots'],
    algorithm: 'basic'
  });

  const [ranges, setRanges] = useState({
    count: 10,
    width: { min: 64, max: 512 },
    height: { min: 64, max: 512 },
    bgColor: { r: { min: 0, max: 50 }, g: { min: 0, max: 50 }, b: { min: 0, max: 50 } },
    fgColor: { r: { min: 200, max: 255 }, g: { min: 200, max: 255 }, b: { min: 200, max: 255 } },
    shapes: { enabled: ['circle', 'square', 'line'] },
    patterns: { enabled: ['dots', 'stripes', 'gradient'] },
    algorithms: { enabled: ['basic', 'mandelbrot', 'julia', 'perlin', 'sierpinski', 'koch'] }
  });

  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const algorithms = [
    'basic',
    'mandelbrot',
    'julia',
    'perlin',
    'sierpinski',
    'koch'
  ];

  const shapeOptions = ['circle', 'square', 'line'];
  const patternOptions = ['dots', 'stripes', 'gradient'];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedImages(prev => [...prev, data.image]);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generando imagen');
    }
    setLoading(false);
  };

  const handleGenerateMultiple = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: ranges.count, ranges }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedImages(prev => [...prev, ...data.images]);
      }
    } catch (error) {
      console.error('Error generating multiple images:', error);
      alert('Error generando imágenes múltiples');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setGeneratedImages([]);
  };

  const handleDownload = (imageData, index) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `nft-image-${index + 1}.png`;
    link.click();
  };

  const toggleShape = (shape) => {
    setParams(prev => ({
      ...prev,
      shapes: prev.shapes.includes(shape)
        ? prev.shapes.filter(s => s !== shape)
        : [...prev.shapes, shape]
    }));
  };

  const togglePattern = (pattern) => {
    setParams(prev => ({
      ...prev,
      patterns: prev.patterns.includes(pattern)
        ? prev.patterns.filter(p => p !== pattern)
        : [...prev.patterns, pattern]
    }));
  };

  const toggleShapeRange = (shape) => {
    setRanges(prev => ({
      ...prev,
      shapes: {
        ...prev.shapes,
        enabled: prev.shapes.enabled.includes(shape)
          ? prev.shapes.enabled.filter(s => s !== shape)
          : [...prev.shapes.enabled, shape]
      }
    }));
  };

  const togglePatternRange = (pattern) => {
    setRanges(prev => ({
      ...prev,
      patterns: {
        ...prev.patterns,
        enabled: prev.patterns.enabled.includes(pattern)
          ? prev.patterns.enabled.filter(p => p !== pattern)
          : [...prev.patterns.enabled, pattern]
      }
    }));
  };

  const toggleAlgorithmRange = (alg) => {
    setRanges(prev => ({
      ...prev,
      algorithms: {
        ...prev.algorithms,
        enabled: prev.algorithms.enabled.includes(alg)
          ? prev.algorithms.enabled.filter(a => a !== alg)
          : [...prev.algorithms.enabled, alg]
      }
    }));
  };

  return (
    <div className="app">
      <h1>Generador de Galería NFT</h1>
      
      <div className="container">
        <div className="controls">
          <h2>Controles de Generación</h2>
          
          <div className="control-group">
            <label>Modo:</label>
            <div className="mode-toggle">
              <button 
                className={mode === 'single' ? 'active' : ''} 
                onClick={() => setMode('single')}
              >
                Individual
              </button>
              <button 
                className={mode === 'multiple' ? 'active' : ''} 
                onClick={() => setMode('multiple')}
              >
                Múltiple (Aleatorio)
              </button>
            </div>
          </div>

          {mode === 'single' ? (
            <>
              <div className="control-group">
                <label>Tamaño (X x Y):</label>
                <input
                  type="number"
                  value={params.width}
                  onChange={(e) => setParams({ ...params, width: parseInt(e.target.value) || 256 })}
                  min="16"
                  max="1000"
                />
                <span>x</span>
                <input
                  type="number"
                  value={params.height}
                  onChange={(e) => setParams({ ...params, height: parseInt(e.target.value) || 256 })}
                  min="16"
                  max="1000"
                />
              </div>

              <div className="control-group">
                <label>Color Fondo:</label>
                <input
                  type="color"
                  value={params.bgColor}
                  onChange={(e) => setParams({ ...params, bgColor: e.target.value })}
                />
              </div>

              <div className="control-group">
                <label>Color Frontal:</label>
                <input
                  type="color"
                  value={params.fgColor}
                  onChange={(e) => setParams({ ...params, fgColor: e.target.value })}
                />
              </div>

              <div className="control-group">
                <label>Algoritmo:</label>
                <select
                  value={params.algorithm}
                  onChange={(e) => setParams({ ...params, algorithm: e.target.value })}
                >
                  {algorithms.map(alg => (
                    <option key={alg} value={alg}>
                      {alg.charAt(0).toUpperCase() + alg.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {params.algorithm === 'basic' && (
                <>
                  <div className="control-group">
                    <label>Formas:</label>
                    {shapeOptions.map(shape => (
                      <label key={shape} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={params.shapes.includes(shape)}
                          onChange={() => toggleShape(shape)}
                        />
                        {shape.charAt(0).toUpperCase() + shape.slice(1)}
                      </label>
                    ))}
                  </div>

                  <div className="control-group">
                    <label>Patrones:</label>
                    {patternOptions.map(pattern => (
                      <label key={pattern} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={params.patterns.includes(pattern)}
                          onChange={() => togglePattern(pattern)}
                        />
                        {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                      </label>
                    ))}
                  </div>
                </>
              )}

              <div className="button-group">
                <button onClick={handleGenerate} disabled={loading}>
                  {loading ? 'Generando...' : 'Generar Imagen'}
                </button>
                <button onClick={handleClear}>
                  Limpiar Galería
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="control-group">
                <label>Cantidad de Imágenes (1-100):</label>
                <input
                  type="number"
                  value={ranges.count}
                  onChange={(e) => setRanges({ ...ranges, count: Math.min(Math.max(parseInt(e.target.value) || 1, 1), 100) })}
                  min="1"
                  max="100"
                />
              </div>

              <div className="control-group">
                <label>Ancho:</label>
                <div>
                  <input
                    type="number"
                    min="16"
                    max="1000"
                    value={ranges.width.min}
                    onChange={(e) => setRanges({ ...ranges, width: { ...ranges.width, min: parseInt(e.target.value) } })}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="16"
                    max="1000"
                    value={ranges.width.max}
                    onChange={(e) => setRanges({ ...ranges, width: { ...ranges.width, max: parseInt(e.target.value) } })}
                  />
                </div>
              </div>

              <div className="control-group">
                <label>Alto:</label>
                <div>
                  <input
                    type="number"
                    min="16"
                    max="1000"
                    value={ranges.height.min}
                    onChange={(e) => setRanges({ ...ranges, height: { ...ranges.height, min: parseInt(e.target.value) } })}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="16"
                    max="1000"
                    value={ranges.height.max}
                    onChange={(e) => setRanges({ ...ranges, height: { ...ranges.height, max: parseInt(e.target.value) } })}
                  />
                </div>
              </div>

              <div className="control-group">
                <label>Color Fondo (RGB):</label>
                <div className="rgb-sliders">
                  <div>
                    <label>R:</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.bgColor.r.min}
                      onChange={(e) => setRanges({ ...ranges, bgColor: { ...ranges.bgColor, r: { ...ranges.bgColor.r, min: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.bgColor.r.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.bgColor.r.max}
                      onChange={(e) => setRanges({ ...ranges, bgColor: { ...ranges.bgColor, r: { ...ranges.bgColor.r, max: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.bgColor.r.max}</span>
                  </div>
                  <div>
                    <label>G:</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.bgColor.g.min}
                      onChange={(e) => setRanges({ ...ranges, bgColor: { ...ranges.bgColor, g: { ...ranges.bgColor.g, min: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.bgColor.g.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.bgColor.g.max}
                      onChange={(e) => setRanges({ ...ranges, bgColor: { ...ranges.bgColor, g: { ...ranges.bgColor.g, max: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.bgColor.g.max}</span>
                  </div>
                  <div>
                    <label>B:</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.bgColor.b.min}
                      onChange={(e) => setRanges({ ...ranges, bgColor: { ...ranges.bgColor, b: { ...ranges.bgColor.b, min: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.bgColor.b.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.bgColor.b.max}
                      onChange={(e) => setRanges({ ...ranges, bgColor: { ...ranges.bgColor, b: { ...ranges.bgColor.b, max: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.bgColor.b.max}</span>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <label>Color Frontal (RGB):</label>
                <div className="rgb-sliders">
                  <div>
                    <label>R:</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.fgColor.r.min}
                      onChange={(e) => setRanges({ ...ranges, fgColor: { ...ranges.fgColor, r: { ...ranges.fgColor.r, min: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.fgColor.r.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.fgColor.r.max}
                      onChange={(e) => setRanges({ ...ranges, fgColor: { ...ranges.fgColor, r: { ...ranges.fgColor.r, max: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.fgColor.r.max}</span>
                  </div>
                  <div>
                    <label>G:</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.fgColor.g.min}
                      onChange={(e) => setRanges({ ...ranges, fgColor: { ...ranges.fgColor, g: { ...ranges.fgColor.g, min: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.fgColor.g.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.fgColor.g.max}
                      onChange={(e) => setRanges({ ...ranges, fgColor: { ...ranges.fgColor, g: { ...ranges.fgColor.g, max: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.fgColor.g.max}</span>
                  </div>
                  <div>
                    <label>B:</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.fgColor.b.min}
                      onChange={(e) => setRanges({ ...ranges, fgColor: { ...ranges.fgColor, b: { ...ranges.fgColor.b, min: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.fgColor.b.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={ranges.fgColor.b.max}
                      onChange={(e) => setRanges({ ...ranges, fgColor: { ...ranges.fgColor, b: { ...ranges.fgColor.b, max: parseInt(e.target.value) } } })}
                    />
                    <span>{ranges.fgColor.b.max}</span>
                  </div>
                </div>
              </div>

              <div className="control-group">
                <label>Algoritmos:</label>
                {algorithms.map(alg => (
                  <label key={alg} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={ranges.algorithms.enabled.includes(alg)}
                      onChange={() => toggleAlgorithmRange(alg)}
                    />
                    {alg.charAt(0).toUpperCase() + alg.slice(1)}
                  </label>
                ))}
              </div>

              <div className="control-group">
                <label>Formas:</label>
                {shapeOptions.map(shape => (
                  <label key={shape} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={ranges.shapes.enabled.includes(shape)}
                      onChange={() => toggleShapeRange(shape)}
                    />
                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                  </label>
                ))}
              </div>

              <div className="control-group">
                <label>Patrones:</label>
                {patternOptions.map(pattern => (
                  <label key={pattern} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={ranges.patterns.enabled.includes(pattern)}
                      onChange={() => togglePatternRange(pattern)}
                    />
                    {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                  </label>
                ))}
              </div>

              <div className="button-group">
                <button onClick={handleGenerateMultiple} disabled={loading}>
                  {loading ? 'Generando...' : `Generar ${ranges.count} Imágenes`}
                </button>
                <button onClick={handleClear}>
                  Limpiar Galería
                </button>
              </div>
            </>
          )}
        </div>

        <div className="gallery">
          <h2>Galería Generada ({generatedImages.length} imágenes)</h2>
          {generatedImages.length === 0 ? (
            <p className="empty-gallery">No hay imágenes generadas aún. ¡Usa los controles para crear una!</p>
          ) : (
            <div className="gallery-grid">
              {generatedImages.map((img, index) => (
                <div key={index} className="gallery-item">
                  <img src={img} alt={`Generated NFT ${index + 1}`} />
                  <div className="item-actions">
                    <button onClick={() => handleDownload(img, index)}>
                      Descargar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;