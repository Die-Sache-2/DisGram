import signatureModal from './signature.modal.mjs';

let modals = new Map();
modals.set(signatureModal.form.data.custom_id, signatureModal);

export default modals;