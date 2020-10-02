// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'services_controller.dart';

// **************************************************************************
// InjectionGenerator
// **************************************************************************

final $ServicesController = BindInject(
  (i) => ServicesController(),
  singleton: true,
  lazy: true,
);

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$ServicesController on _ServicesControllerBase, Store {
  final _$servicesAtom = Atom(name: '_ServicesControllerBase.services');

  @override
  ServicoModel get services {
    _$servicesAtom.reportRead();
    return super.services;
  }

  @override
  set services(ServicoModel value) {
    _$servicesAtom.reportWrite(value, super.services, () {
      super.services = value;
    });
  }

  final _$fetchServicesAsyncAction =
      AsyncAction('_ServicesControllerBase.fetchServices');

  @override
  Future fetchServices() {
    return _$fetchServicesAsyncAction.run(() => super.fetchServices());
  }

  @override
  String toString() {
    return '''
services: ${services}
    ''';
  }
}
