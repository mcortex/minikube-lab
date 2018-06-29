-- CREAMOS LA BBDD
create database invoice_mgmt;

-- CREAMOS LA TABLA PRINCIPAL INVOICES
create table invoices (
  invoice_id INT NOT NULL,
  documentno VARCHAR(20) NOT NULL,
  expected_date DATETIME,
  primary key(invoice_id)
);

-- INSERTAMOS VALORES DE PRUEBA
insert into invoices (invoice_id, documentno)
values (1,'B00010000001');

insert into invoices (invoice_id, documentno)
values (2,'B00010000007');

insert into invoices (invoice_id, documentno)
values (3,'B00010000100');
