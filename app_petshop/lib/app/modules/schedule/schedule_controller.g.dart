// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'schedule_controller.dart';

// **************************************************************************
// InjectionGenerator
// **************************************************************************

final $ScheduleController = BindInject(
  (i) => ScheduleController(),
  singleton: true,
  lazy: true,
);

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$ScheduleController on _ScheduleControllerBase, Store {
  final _$canShowFabAtom = Atom(name: '_ScheduleControllerBase.canShowFab');

  @override
  bool get canShowFab {
    _$canShowFabAtom.reportRead();
    return super.canShowFab;
  }

  @override
  set canShowFab(bool value) {
    _$canShowFabAtom.reportWrite(value, super.canShowFab, () {
      super.canShowFab = value;
    });
  }

  final _$_ScheduleControllerBaseActionController =
      ActionController(name: '_ScheduleControllerBase');

  @override
  void setFab(bool value) {
    final _$actionInfo = _$_ScheduleControllerBaseActionController.startAction(
        name: '_ScheduleControllerBase.setFab');
    try {
      return super.setFab(value);
    } finally {
      _$_ScheduleControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
canShowFab: ${canShowFab}
    ''';
  }
}
