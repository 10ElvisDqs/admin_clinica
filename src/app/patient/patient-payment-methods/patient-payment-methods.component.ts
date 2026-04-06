import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientAuthService } from 'src/app/shared/auth/patient-auth.service';

interface PaymentMethodType {
  value: string;
  label: string;
  icon: string;
  color: string;
  needsAccount: boolean;
  needsPhone: boolean;
}

@Component({
  selector: 'app-patient-payment-methods',
  templateUrl: './patient-payment-methods.component.html',
  standalone: false,
})
export class PatientPaymentMethodsComponent implements OnInit {

  methods: any[] = [];
  loading  = false;
  saving   = false;
  deleting: number | null = null;
  error    = '';
  success  = '';
  showForm = false;

  readonly methodTypes: PaymentMethodType[] = [
    { value: 'bank_transfer', label: 'Transferencia bancaria', icon: 'icon-briefcase',   color: '#2e37a4', needsAccount: true,  needsPhone: false },
    { value: 'tigo_money',    label: 'Tigo Money',             icon: 'icon-smartphone',  color: '#f97316', needsAccount: false, needsPhone: true  },
    { value: 'qr',            label: 'QR / Billetera',         icon: 'icon-grid',        color: '#8b5cf6', needsAccount: false, needsPhone: true  },
    { value: 'cash',          label: 'Efectivo',               icon: 'icon-dollar-sign', color: '#22c55e', needsAccount: false, needsPhone: false },
  ];

  readonly banks = ['BNB', 'Banco Unión', 'BCP Bolivia', 'Banco Mercantil', 'BISA', 'Banco Sol', 'Banco Económico', 'Otro'];

  form: FormGroup;

  constructor(private auth: PatientAuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      type:           ['bank_transfer', Validators.required],
      label:          ['', [Validators.required, Validators.maxLength(80)]],
      bank_name:      [''],
      account_number: [''],
      account_holder: [''],
      phone_number:   [''],
      is_default:     [false],
    });
  }

  ngOnInit(): void {
    this.loadMethods();
    this.onTypeChange();
  }

  onTypeChange() {
    this.form.get('type')!.valueChanges.subscribe(type => {
      const info = this.methodTypes.find(m => m.value === type)!;
      if (info.needsAccount) {
        this.form.get('account_number')!.setValidators([Validators.required]);
        this.form.get('account_holder')!.setValidators([Validators.required]);
        this.form.get('phone_number')!.clearValidators();
      } else if (info.needsPhone) {
        this.form.get('phone_number')!.setValidators([Validators.required]);
        this.form.get('account_number')!.clearValidators();
        this.form.get('account_holder')!.clearValidators();
      } else {
        this.form.get('account_number')!.clearValidators();
        this.form.get('account_holder')!.clearValidators();
        this.form.get('phone_number')!.clearValidators();
      }
      ['account_number', 'account_holder', 'phone_number'].forEach(c =>
        this.form.get(c)!.updateValueAndValidity()
      );
    });
  }

  loadMethods() {
    this.loading = true;
    this.auth.getPaymentMethods().subscribe({
      next: (r: any) => { this.methods = r.data || []; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  getTypeInfo(type: string): PaymentMethodType {
    return this.methodTypes.find(m => m.value === type) ?? this.methodTypes[3];
  }

  get selectedTypeInfo(): PaymentMethodType {
    return this.getTypeInfo(this.form.value.type);
  }

  openForm() {
    this.form.reset({ type: 'bank_transfer', is_default: false });
    this.error   = '';
    this.success = '';
    this.showForm = true;
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.error  = '';

    this.auth.addPaymentMethod(this.form.value).subscribe({
      next: () => {
        this.saving   = false;
        this.showForm = false;
        this.success  = 'Método de pago registrado correctamente.';
        this.loadMethods();
        setTimeout(() => this.success = '', 4000);
      },
      error: (err: any) => {
        this.error  = err?.error?.message || 'Error al guardar.';
        this.saving = false;
      },
    });
  }

  setDefault(id: number) {
    this.auth.setDefaultPaymentMethod(id).subscribe({
      next: () => { this.loadMethods(); },
    });
  }

  delete(id: number) {
    this.deleting = id;
    this.auth.deletePaymentMethod(id).subscribe({
      next: () => { this.deleting = null; this.loadMethods(); },
      error: () => { this.deleting = null; },
    });
  }

  hasError(field: string): boolean {
    const c = this.form.get(field)!;
    return c.invalid && c.touched;
  }
}
