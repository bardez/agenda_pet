class ScheduleModel {
  String message;
  bool status;
  Data data;

  ScheduleModel({this.message, this.status, this.data});

  ScheduleModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    status = json['status'];
    data = json['data'] != null ? new Data.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['message'] = this.message;
    data['status'] = this.status;
    if (this.data != null) {
      data['data'] = this.data.toJson();
    }
    return data;
  }
}

class Data {
  int count;
  List<Rows> rows;

  Data({this.count, this.rows});

  Data.fromJson(Map<String, dynamic> json) {
    count = json['count'];
    if (json['rows'] != null) {
      rows = new List<Rows>();
      json['rows'].forEach((v) {
        rows.add(new Rows.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['count'] = this.count;
    if (this.rows != null) {
      data['rows'] = this.rows.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Rows {
  int ageId;
  int ageUsuId;
  int agePetId;
  String ageData;
  String ageHora;
  String ageObs;
  String createdAt;
  Usuario usuario;
  Pet pet;

  Rows(
      {this.ageId,
      this.ageUsuId,
      this.agePetId,
      this.ageData,
      this.ageHora,
      this.ageObs,
      this.createdAt,
      this.usuario,
      this.pet});

  Rows.fromJson(Map<String, dynamic> json) {
    ageId = json['age_id'];
    ageUsuId = json['age_usu_id'];
    agePetId = json['age_pet_id'];
    ageData = json['age_data'];
    ageHora = json['age_hora'];
    ageObs = json['age_obs'];
    createdAt = json['created_at'];
    usuario =
        json['usuario'] != null ? new Usuario.fromJson(json['usuario']) : null;
    pet = json['pet'] != null ? new Pet.fromJson(json['pet']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['age_id'] = this.ageId;
    data['age_usu_id'] = this.ageUsuId;
    data['age_pet_id'] = this.agePetId;
    data['age_data'] = this.ageData;
    data['age_hora'] = this.ageHora;
    data['age_obs'] = this.ageObs;
    data['created_at'] = this.createdAt;
    if (this.usuario != null) {
      data['usuario'] = this.usuario.toJson();
    }
    if (this.pet != null) {
      data['pet'] = this.pet.toJson();
    }
    return data;
  }
}

class Usuario {
  int usuId;
  String usuNome;
  int usuTipId;
  String usuEmail;
  int usuStatus;
  String usuCelular;
  String usuCpfCnpj;
  String usuSenha;
  TipoUsuario tipoUsuario;

  Usuario(
      {this.usuId,
      this.usuNome,
      this.usuTipId,
      this.usuEmail,
      this.usuStatus,
      this.usuCelular,
      this.usuCpfCnpj,
      this.usuSenha,
      this.tipoUsuario});

  Usuario.fromJson(Map<String, dynamic> json) {
    usuId = json['usu_id'];
    usuNome = json['usu_nome'];
    usuTipId = json['usu_tip_id'];
    usuEmail = json['usu_email'];
    usuStatus = json['usu_status'];
    usuCelular = json['usu_celular'];
    usuCpfCnpj = json['usu_cpf_cnpj'];
    usuSenha = json['usu_senha'];
    tipoUsuario = json['tipo_usuario'] != null
        ? new TipoUsuario.fromJson(json['tipo_usuario'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['usu_id'] = this.usuId;
    data['usu_nome'] = this.usuNome;
    data['usu_tip_id'] = this.usuTipId;
    data['usu_email'] = this.usuEmail;
    data['usu_status'] = this.usuStatus;
    data['usu_celular'] = this.usuCelular;
    data['usu_cpf_cnpj'] = this.usuCpfCnpj;
    data['usu_senha'] = this.usuSenha;
    if (this.tipoUsuario != null) {
      data['tipo_usuario'] = this.tipoUsuario.toJson();
    }
    return data;
  }
}

class TipoUsuario {
  int tipId;
  String tipDesc;

  TipoUsuario({this.tipId, this.tipDesc});

  TipoUsuario.fromJson(Map<String, dynamic> json) {
    tipId = json['tip_id'];
    tipDesc = json['tip_desc'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['tip_id'] = this.tipId;
    data['tip_desc'] = this.tipDesc;
    return data;
  }
}

class Pet {
  int petId;
  int petCatId;
  int petUsuId;
  String petNome;
  String petNascimento;
  String petRaca;
  String petObs;
  Usuario usuario;
  CategoriaPet categoriaPet;

  Pet(
      {this.petId,
      this.petCatId,
      this.petUsuId,
      this.petNome,
      this.petNascimento,
      this.petRaca,
      this.petObs,
      this.usuario,
      this.categoriaPet});

  Pet.fromJson(Map<String, dynamic> json) {
    petId = json['pet_id'];
    petCatId = json['pet_cat_id'];
    petUsuId = json['pet_usu_id'];
    petNome = json['pet_nome'];
    petNascimento = json['pet_nascimento'];
    petRaca = json['pet_raca'];
    petObs = json['pet_obs'];
    usuario =
        json['usuario'] != null ? new Usuario.fromJson(json['usuario']) : null;
    categoriaPet = json['categoria_pet'] != null
        ? new CategoriaPet.fromJson(json['categoria_pet'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['pet_id'] = this.petId;
    data['pet_cat_id'] = this.petCatId;
    data['pet_usu_id'] = this.petUsuId;
    data['pet_nome'] = this.petNome;
    data['pet_nascimento'] = this.petNascimento;
    data['pet_raca'] = this.petRaca;
    data['pet_obs'] = this.petObs;
    if (this.usuario != null) {
      data['usuario'] = this.usuario.toJson();
    }
    if (this.categoriaPet != null) {
      data['categoria_pet'] = this.categoriaPet.toJson();
    }
    return data;
  }
}

class CategoriaPet {
  int capId;
  String capDesc;

  CategoriaPet({this.capId, this.capDesc});

  CategoriaPet.fromJson(Map<String, dynamic> json) {
    capId = json['cap_id'];
    capDesc = json['cap_desc'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['cap_id'] = this.capId;
    data['cap_desc'] = this.capDesc;
    return data;
  }
}
