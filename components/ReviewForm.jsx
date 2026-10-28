'use client';

import { useEffect, useState } from 'react';

const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

export default function ReviewForm() {
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function chooseImage(event) {
    const file = event.target.files?.[0] || null;
    setError('');

    if (!file) {
      setImage(null);
      setPreview('');
      return;
    }
    if (!acceptedImageTypes.includes(file.type)) {
      setError('Usa una foto JPG, PNG o WebP.');
      event.target.value = '';
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('La foto no puede superar los 8 MB.');
      event.target.value = '';
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImage(null);
    setPreview('');
    setError('');
  }

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const city = data.get('city')?.trim();
    const subject = `Reseña de ${name} · Manos Creativas`;
    const body = `Enviar a: bynw808@gmail.com\n\nNombre: ${name}${city ? `\nCiudad: ${city}` : ''}\nValoración: ${data.get('rating')}/5\n\n${review}${image ? '\n\nFoto del trabajo adjunta. Usar como foto de perfil de esta reseña.' : ''}`;

    if (image && navigator.share && navigator.canShare?.({ files: [image] })) {
      try {
        await navigator.share({ title: subject, text: body, files: [image] });
        return;
      } catch (shareError) {
        if (shareError?.name === 'AbortError') return;
      }
    }

    if (image) {
      setError('Tu correo se abrirá ahora. Adjunta la foto seleccionada antes de enviarlo; el navegador no puede añadirla automáticamente en este dispositivo.');
    }
    window.location.href = `mailto:bynw808@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <form onSubmit={submit} className="review-form">
    <label>Tu nombre<input name="name" required maxLength={80} placeholder="Ej. María García" autoComplete="name" /></label>
    <label>Ciudad <small>(opcional)</small><input name="city" maxLength={80} placeholder="Ej. Madrid" autoComplete="address-level2" /></label>
    <fieldset><legend>Valoración</legend><div className="star-options">{[1, 2, 3, 4, 5].map(n => <label key={n}><input type="radio" name="rating" value={n} defaultChecked={n === 5} /><span>{n} ★</span></label>)}</div></fieldset>
    <label>Tu reseña<textarea required name="review" maxLength={600} rows={5} value={review} onChange={e => setReview(e.target.value)} placeholder="Cuéntanos cómo te ha ido…" /></label>
    <span className="review-counter">{review.length}/600</span>
    <div className="review-photo-field">
      <span className="review-photo-label">Foto de tu trabajo <small>(opcional)</small></span>
      {preview ? <div className="review-photo-preview"><img src={preview} alt="Vista previa de tu foto de perfil" /><div><b>Así aparecerá en tu reseña</b><label className="review-photo-change">Cambiar foto<input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} /></label><button type="button" onClick={removeImage}>Quitar foto</button></div></div> : <label className="review-photo-upload"><span>＋</span><b>Subir una foto</b><small>JPG, PNG o WebP · una sola imagen</small><input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} /></label>}
    </div>
    {error && <p className="review-form-message" role="status">{error}</p>}
    <button type="submit" className="button">PUBLICAR RESEÑA <span>↗</span></button>
    <p className="fine-print">La foto de tu trabajo se usará como imagen de perfil de la reseña. En dispositivos compatibles se enviará adjunta; si tu correo no admite adjuntos automáticos, solo tendrás que añadirla antes de enviar.</p>
  </form>;
}
