class ServicoModel {
  String message;
  bool status;
  Data data;

  ServicoModel({this.message, this.status, this.data});

  ServicoModel.fromJson(Map<String, dynamic> json) {
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
  int serId;
  int serTipId;
  String serValor;
  String createdAt;
  Null deletedAt;
  TipoServico tipoServico;

  Rows(
      {this.serId,
      this.serTipId,
      this.serValor,
      this.createdAt,
      this.deletedAt,
      this.tipoServico});

  Rows.fromJson(Map<String, dynamic> json) {
    serId = json['ser_id'];
    serTipId = json['ser_tip_id'];
    serValor = json['ser_valor'];
    createdAt = json['created_at'];
    deletedAt = json['deleted_at'];
    tipoServico = json['tipo_servico'] != null
        ? new TipoServico.fromJson(json['tipo_servico'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['ser_id'] = this.serId;
    data['ser_tip_id'] = this.serTipId;
    data['ser_valor'] = this.serValor;
    data['created_at'] = this.createdAt;
    data['deleted_at'] = this.deletedAt;
    if (this.tipoServico != null) {
      data['tipo_servico'] = this.tipoServico.toJson();
    }
    return data;
  }
}

class TipoServico {
  int tisId;
  int tisCfgId;
  String tisDesc;
  String createdAt;
  String updatedAt;
  Null deletedAt;
  Configuracao configuracao;

  TipoServico(
      {this.tisId,
      this.tisCfgId,
      this.tisDesc,
      this.createdAt,
      this.updatedAt,
      this.deletedAt,
      this.configuracao});

  TipoServico.fromJson(Map<String, dynamic> json) {
    tisId = json['tis_id'];
    tisCfgId = json['tis_cfg_id'];
    tisDesc = json['tis_desc'];
    createdAt = json['created_at'];
    updatedAt = json['updated_at'];
    deletedAt = json['deleted_at'];
    configuracao = json['configuracao'] != null
        ? new Configuracao.fromJson(json['configuracao'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['tis_id'] = this.tisId;
    data['tis_cfg_id'] = this.tisCfgId;
    data['tis_desc'] = this.tisDesc;
    data['created_at'] = this.createdAt;
    data['updated_at'] = this.updatedAt;
    data['deleted_at'] = this.deletedAt;
    if (this.configuracao != null) {
      data['configuracao'] = this.configuracao.toJson();
    }
    return data;
  }
}

class Configuracao {
  int cfgId;
  int cfgStatus;
  int cfgSeg;
  int cfgTer;
  int cfgQua;
  int cfgQui;
  int cfgSex;
  int cfgSab;
  int cfgDom;
  int cfgDuracaoMin;
  String cfgHoraIni;
  String cfgHoraFim;
  Null cfgIntervaloIni;
  Null cfgIntervaloFim;
  String createdAt;
  String updatedAt;
  Null deletedAt;

  Configuracao(
      {this.cfgId,
      this.cfgStatus,
      this.cfgSeg,
      this.cfgTer,
      this.cfgQua,
      this.cfgQui,
      this.cfgSex,
      this.cfgSab,
      this.cfgDom,
      this.cfgDuracaoMin,
      this.cfgHoraIni,
      this.cfgHoraFim,
      this.cfgIntervaloIni,
      this.cfgIntervaloFim,
      this.createdAt,
      this.updatedAt,
      this.deletedAt});

  Configuracao.fromJson(Map<String, dynamic> json) {
    cfgId = json['cfg_id'];
    cfgStatus = json['cfg_status'];
    cfgSeg = json['cfg_seg'];
    cfgTer = json['cfg_ter'];
    cfgQua = json['cfg_qua'];
    cfgQui = json['cfg_qui'];
    cfgSex = json['cfg_sex'];
    cfgSab = json['cfg_sab'];
    cfgDom = json['cfg_dom'];
    cfgDuracaoMin = json['cfg_duracao_min'];
    cfgHoraIni = json['cfg_hora_ini'];
    cfgHoraFim = json['cfg_hora_fim'];
    cfgIntervaloIni = json['cfg_intervalo_ini'];
    cfgIntervaloFim = json['cfg_intervalo_fim'];
    createdAt = json['created_at'];
    updatedAt = json['updated_at'];
    deletedAt = json['deleted_at'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['cfg_id'] = this.cfgId;
    data['cfg_status'] = this.cfgStatus;
    data['cfg_seg'] = this.cfgSeg;
    data['cfg_ter'] = this.cfgTer;
    data['cfg_qua'] = this.cfgQua;
    data['cfg_qui'] = this.cfgQui;
    data['cfg_sex'] = this.cfgSex;
    data['cfg_sab'] = this.cfgSab;
    data['cfg_dom'] = this.cfgDom;
    data['cfg_duracao_min'] = this.cfgDuracaoMin;
    data['cfg_hora_ini'] = this.cfgHoraIni;
    data['cfg_hora_fim'] = this.cfgHoraFim;
    data['cfg_intervalo_ini'] = this.cfgIntervaloIni;
    data['cfg_intervalo_fim'] = this.cfgIntervaloFim;
    data['created_at'] = this.createdAt;
    data['updated_at'] = this.updatedAt;
    data['deleted_at'] = this.deletedAt;
    return data;
  }
}