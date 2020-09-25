// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'configurations_controller.dart';

// **************************************************************************
// InjectionGenerator
// **************************************************************************

final $ConfigurationsController = BindInject(
  (i) => ConfigurationsController(),
  singleton: true,
  lazy: true,
);

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$ConfigurationsController on _ConfigurationsControllerBase, Store {
  final _$valueAtom = Atom(name: '_ConfigurationsControllerBase.value');

  @override
  int get value {
    _$valueAtom.reportRead();
    return super.value;
  }

  @override
  set value(int value) {
    _$valueAtom.reportWrite(value, super.value, () {
      super.value = value;
    });
  }

  final _$_ConfigurationsControllerBaseActionController =
      ActionController(name: '_ConfigurationsControllerBase');

  @override
  void increment() {
    final _$actionInfo = _$_ConfigurationsControllerBaseActionController
        .startAction(name: '_ConfigurationsControllerBase.increment');
    try {
      return super.increment();
    } finally {
      _$_ConfigurationsControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
value: ${value}
    ''';
  }
}
