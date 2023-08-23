declare namespace ListType {
  interface ListItem {
    company_id: number
    company_name: string
    company_permissions: string
    company_nature: string[]
    product_number: number
    vest_bag: number
    head_number: number
    representative: string
    belong_to: string
    legal_bp: string
    financial_bp: string
    tax_bp: string
    main_notation: string[]
    name: string
    package_type: string
    operation_status: string
    business_place: string
    specific_place: string
    project_group: string
    operation_channel: string
    main_package: string
    business_owner: string
    finance_bp: string
    income_cale: string
    income_cale_name: string
    ownership_place: string
    legal_represent: string
    is_follow: number

    // 知识产权-商标/专利/版权
    business_group: string;
    case_number: string;
    apply_company: string;
    logo_type: string;
    logo_url: string;
    international_class: string;
    apply_number: string;
    apply_date: string;
    register_limited: string;
    groups: string;
    product_service: string;
    legal_status: string;
    effective_date: string;
    official_document_url: string;
    is_closed: string;
    pending_date: string;
    time_reminder: string;
    register_cert_url: string;
    agency: string;
    keeping_place: string;
    custodian: string;
    created_user: string;
    created_realname: string;
    inventor: string;
    patent_type: string;
    publish_date: string;
    completion_date: string;
    cert_number: string;
    acquire_way: string;
    copyright_type: string;
    checkin_number: string;
    checkin_date: string;
  }
}
type ModalOpenType = 'Add' | 'Edit' | 'View'

