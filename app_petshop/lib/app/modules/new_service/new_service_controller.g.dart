// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'new_service_controller.dart';

// **************************************************************************
// InjectionGenerator
// **************************************************************************

final $NewServiceController = BindInject(
  (i) => NewServiceController(),
  singleton: true,
  lazy: true,
);

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$NewServiceController on _NewServiceControllerBase, Store {
  final _$valueAtom = Atom(name: '_NewServiceControllerBase.value');

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

  final _$serviceTypeListAtom =
      Atom(name: '_NewServiceControllerBase.serviceTypeList');

  @override
  List<DropdownMenuItem<dynamic>> get serviceTypeList {
    _$serviceTypeListAtom.reportRead();
    return super.serviceTypeList;
  }

  @override
  set serviceTypeList(List<DropdownMenuItem<dynamic>> value) {
    _$serviceTypeListAtom.reportWrite(value, super.serviceTypeList, () {
      super.serviceTypeList = value;
    });
  }

  final _$_NewServiceControllerBaseActionController =
      ActionController(name: '_NewServiceControllerBase');

  @override
  void increment() {
    final _$actionInfo = _$_NewServiceControllerBaseActionController
        .startAction(name: '_NewServiceControllerBase.increment');
    try {
      return super.increment();
    } finally {
      _$_NewServiceControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void createServiceTypeList(List<DropdownMenuItem<dynamic>> list) {
    final _$actionInfo = _$_NewServiceControllerBaseActionController
        .startAction(name: '_NewServiceControllerBase.createServiceTypeList');
    try {
      return super.createServiceTypeList(list);
    } finally {
      _$_NewServiceControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
value: ${value},
serviceTypeList: ${serviceTypeList}
    ''';
  }
}
