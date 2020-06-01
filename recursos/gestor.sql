/*==============================================================*/
/* Table: areas                                                 */
/*==============================================================*/
create table areas (
   cve_area             serial not null,
   nombre               varchar(200)         not null,
   activo               bool                 not null,
   fecha_creacion       timestamp            not null,
   cve_persona_reg      int4                 not null
);

comment on column areas.cve_area is
'Identificador único del área de la SF
';

comment on column areas.nombre is
'Campo que contiene el nombre del área';

comment on column areas.activo is
'Campo que representa si está activo (1) o no (0).';

comment on column areas.fecha_creacion is
'Campo que contiene la fecha de creación del registro';

comment on column areas.cve_persona_reg is
'Identificador único de la persona que grabó el registro';

alter table areas
   add constraint pk_areas primary key (cve_area);

/*==============================================================*/
/* Table: carpetas                                              */
/*==============================================================*/
create table carpetas (
   cve_carpeta          serial not null,
   cve_area             int4                 not null,
   cve_carpeta_padre    int4                 null,
   nombre               varchar(200)         not null,
   fecha_creacion       timestamp            not null,
   cve_persona_reg      int4                 not null,
   fecha_modificacion   timestamp            null,
   cve_persona_mod      int4                 null
);

comment on column carpetas.cve_carpeta is
'Identificador único de la carpeta.';

comment on column carpetas.cve_area is
'Identificador único del área de la SF
';

comment on column carpetas.cve_carpeta_padre is
'Campo que representa la carpeta padre de la carpeta';

comment on column carpetas.nombre is
'Campo que contiene el nombre de la carpeta';

comment on column carpetas.fecha_creacion is
'Campo que contiene la fecha de creación del registro';

comment on column carpetas.cve_persona_reg is
'Identificador único de la persona que graba el registro';

comment on column carpetas.fecha_modificacion is
'Campo que contiene la última fecha de modificación del registro';

comment on column carpetas.cve_persona_mod is
'Identificador único de la persona que modifica el registro';

alter table carpetas
   add constraint pk_carpetas primary key (cve_carpeta);

/*==============================================================*/
/* Table: carpetas_archivos                                     */
/*==============================================================*/
create table carpetas_archivos (
   cve_archivo          serial not null,
   cve_carpeta          int4                 null,
   cve_ente             int4                 null,
   nombre               varchar(100)         not null,
   url                  varchar(100)         not null,
   extension            varchar(10)          not null,
   fecha_creacion       timestamp            not null,
   cve_persona_reg      int4                 not null,
   fecha_modificacion   timestamp            null,
   cve_persona_mod      int4                 null
);

comment on column carpetas_archivos.cve_archivo is
'Identificador único del archivo';

comment on column carpetas_archivos.cve_carpeta is
'Identificador único de la carpeta.';

comment on column carpetas_archivos.cve_ente is
'Identificador único del ente
';

comment on column carpetas_archivos.nombre is
'Campo que contiene el nombre del archivo';

comment on column carpetas_archivos.url is
'Campo que contiene la ruta del archivo';

comment on column carpetas_archivos.extension is
'Campo que contiene la extensión del archivo: png, pdf, xls, jpg, png...';

comment on column carpetas_archivos.fecha_creacion is
'Campo que contiene la fecha de creación del registro';

comment on column carpetas_archivos.cve_persona_reg is
'Identificador único de la persona que graba el registro';

comment on column carpetas_archivos.fecha_modificacion is
'Campo que contiene la última fecha de modificación del registro';

comment on column carpetas_archivos.cve_persona_mod is
'Identificador único de la persona que modifica el registro';

alter table carpetas_archivos
   add constraint pk_carpetas_archivos primary key (cve_archivo);

/*==============================================================*/
/* Table: cat_roles                                             */
/*==============================================================*/
create table cat_roles (
   cve_rol              serial not null,
   nombre               varchar(100)         not null,
   activo               bool                 not null,
   cve_persona_reg      int4                 not null
);

comment on column cat_roles.cve_rol is
'Identificador único del rol';

comment on column cat_roles.nombre is
'Campo que contiene el nombre del rol';

comment on column cat_roles.activo is
'Campo que representa si está activo (1) o no (0)';

comment on column cat_roles.cve_persona_reg is
'Identificador único de la persona que grabó el registro';

alter table cat_roles
   add constraint pk_cat_roles primary key (cve_rol);

/*==============================================================*/
/* Table: entes                                                 */
/*==============================================================*/
create table entes (
   cve_ente             serial not null,
   nombre               varchar(300)         not null,
   activo               bool                 not null,
   fecha_creacion       timestamp            not null,
   cve_persona_reg      int4                 not null,
   fecha_modificacion   timestamp            null,
   cve_persona_mod      int4                 null
);

comment on column entes.cve_ente is
'Identificador único del ente
';

comment on column entes.nombre is
'Campo que contiene el nombre del ente';

comment on column entes.activo is
'Campo que representa si está activo (1) o no (0).';

comment on column entes.fecha_creacion is
'Campo que contiene la fecha de creación del registro';

comment on column entes.cve_persona_reg is
'Identificador único de la persona que grabó el registro';

comment on column entes.fecha_modificacion is
'Campo que contiene la fecha de modificación del registro';

comment on column entes.cve_persona_mod is
'Identificador único de la persona que modificó el registro';

alter table entes
   add constraint pk_entes primary key (cve_ente);

/*==============================================================*/
/* Table: roles_usuarios                                        */
/*==============================================================*/
create table roles_usuarios (
   cve_rol              int4                 not null,
   cve_usuario          int4                 not null,
   activo               bool                 not null,
   cve_persona_reg      int4                 not null
);

comment on column roles_usuarios.cve_rol is
'Identificador único del rol';

comment on column roles_usuarios.cve_usuario is
'Identificador único del usuario';

comment on column roles_usuarios.activo is
'Campo que representa si está activo (1) o no (0)';

comment on column roles_usuarios.cve_persona_reg is
'Identificador único de la persona que grabó el registro';

alter table roles_usuarios
   add constraint pk_roles_usuarios primary key (cve_rol, cve_usuario);

/*==============================================================*/
/* Table: usuarios                                              */
/*==============================================================*/
create table usuarios (
   cve_usuario          serial not null,
   nombre               varchar(100)         not null,
   es_interno           bool                 not null,
   cve_area             int4                 null,
   cve_ente             int4                 null,
   usuario              varchar(20)          not null,
   password             varchar(150)         not null,
   recordar             bool                 not null,
   activo               bool                 not null,
   cambiado             bool                 not null,
   fecha_creacion       timestamp            null,
   cve_persona_reg      int4                 not null,
   fecha_modificacion   timestamp            null,
   cve_persona_mod      int4                 null
);

comment on column usuarios.cve_usuario is
'Identificador único del usuario';

comment on column usuarios.nombre is
'Nombre completo del usuario';

comment on column usuarios.es_interno is
'Campo que representa si el usuario es interno (true), es decir, de la SF o externo (false) de algún ente.';

comment on column usuarios.cve_area is
'Identificador único del área de la SF
';

comment on column usuarios.cve_ente is
'Identificador único del ente
';

comment on column usuarios.usuario is
'Campo que contiene el usuario para iniciar sesion en el sistema';

comment on column usuarios.password is
'Campo que contiene el password para iniciar sesion en el sistema';

comment on column usuarios.recordar is
'Campo que representa si el usuario quiere que se recuerde su contraseña (1) o no (0). ';

comment on column usuarios.activo is
'Campo que representa si está activo (1) o no (0)';

comment on column usuarios.cambiado is
'Campo que representa si el password fue cambiado(1) o no(0)';

comment on column usuarios.cve_persona_reg is
'Identificador único de la persona que grabó el registro';

alter table usuarios
   add constraint pk_usuarios primary key (cve_usuario);

alter table carpetas
   add constraint fk_carpetas_reference_carpetas foreign key (cve_carpeta_padre)
      references carpetas (cve_carpeta)
      on delete cascade on update cascade;

alter table carpetas
   add constraint fk_carpetas_reference_areas foreign key (cve_area)
      references areas (cve_area)
      on delete restrict on update restrict;

alter table carpetas_archivos
   add constraint fk_carpetas_reference_carpetas foreign key (cve_carpeta)
      references carpetas (cve_carpeta)
      on delete cascade on update cascade;

alter table carpetas_archivos
   add constraint fk_carpetas_reference_entes foreign key (cve_ente)
      references entes (cve_ente)
      on delete cascade on update cascade;

alter table roles_usuarios
   add constraint fk_roles_us_reference_cat_role foreign key (cve_rol)
      references cat_roles (cve_rol)
      on delete restrict on update restrict;

alter table roles_usuarios
   add constraint fk_roles_us_reference_usuarios foreign key (cve_usuario)
      references usuarios (cve_usuario)
      on delete restrict on update restrict;

alter table usuarios
   add constraint fk_usuarios_reference_areas foreign key (cve_area)
      references areas (cve_area)
      on delete restrict on update restrict;

alter table usuarios
   add constraint fk_usuarios_reference_entes foreign key (cve_ente)
      references entes (cve_ente)
      on delete restrict on update restrict;

