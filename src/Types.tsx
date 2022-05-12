import { gql, useQuery } from 'urql'

export interface Subreddit {
    kind?: string
    data?: {
        after?: string
        dist?: number
        modhash?: string
        geo_filter?: null
        children?: [{
            kind?: string
            data?: {
                approved_at_utc?: null
                subreddit?: string
                selftext?: string
                author_fullname?: string
                saved?: boolean
                mod_reason_title?: null
                gilded?: number
                clicked?: boolean
                title?: string
                link_flair_richtext?: any[]
                subreddit_name_prefixed?: string
                hidden?: boolean
                pwls?: number
                link_flair_css_class?: null | string
                downs?: number
                thumbnail_height?: number | null
                top_awarded_type?: null
                hide_score?: boolean
                name?: string
                quarantine?: boolean
                link_flair_text_color?: string
                upvote_ratio?: number
                author_flair_background_color?: null
                subreddit_type?: string
                ups?: number
                total_awards_received?: number
                media_embed?: {
                    content?: string
                    width?: number
                    scrolling?: boolean
                    height?: number
                }
                thumbnail_width?: number | null
                author_flair_template_id?: null | string
                is_original_content?: boolean
                user_reports?: any[]
                secure_media?: {
                    type?: string
                    oembed?: {
                        provider_url?: string
                        version?: string
                        title?: string
                        type?: string
                        thumbnail_width?: number
                        height?: number | null
                        width?: number
                        html?: string
                        author_name?: string
                        provider_name?: string
                        thumbnail_url?: string
                        thumbnail_height?: number
                        author_url?: string
                        url?: string
                        cache_age?: number
                    }
                }
                is_reddit_media_domain?: boolean
                is_meta?: boolean
                category?: null
                secure_media_embed?: {
                    content?: string
                    width?: number
                    scrolling?: boolean
                    media_domain_url?: string
                    height?: number
                }
                link_flair_text?: null | string
                can_mod_post?: boolean
                score?: number
                approved_by?: null
                is_created_from_ads_ui?: boolean
                author_premium?: boolean
                thumbnail?: string
                edited?: boolean | number
                author_flair_css_class?: null | string
                author_flair_richtext?: any[]
                gildings?: null
                content_categories?: null
                is_self?: boolean
                mod_note?: null
                created?: number
                link_flair_type?: string
                wls?: number
                removed_by_category?: null
                banned_by?: null
                author_flair_type?: string
                domain?: string
                allow_live_comments?: boolean
                selftext_html?: null | string
                likes?: null
                suggested_sort?: null | string
                banned_at_utc?: null
                view_count?: null
                archived?: boolean
                no_follow?: boolean
                is_crosspostable?: boolean
                pinned?: boolean
                over_18?: boolean
                awarders?: any[]
                media_only?: boolean
                can_gild?: boolean
                spoiler?: boolean
                locked?: boolean
                author_flair_text?: null | string
                treatment_tags?: any[]
                visited?: boolean
                removed_by?: null
                num_reports?: null
                distinguished?: null
                subreddit_id?: string
                author_is_blocked?: boolean
                mod_reason_by?: null
                removal_reason?: null
                link_flair_background_color?: string
                id?: string
                is_robot_indexable?: boolean
                report_reasons?: null
                author?: string
                discussion_type?: null
                num_comments?: number
                send_replies?: boolean
                whitelist_status?: string
                contest_mode?: boolean
                mod_reports?: any[]
                author_patreon_flair?: boolean
                author_flair_text_color?: null | string
                permalink?: string
                parent_whitelist_status?: string
                stickied?: boolean
                url?: string
                subreddit_subscribers?: number
                created_utc?: number
                num_crossposts?: number
                media?: {
                    type?: string
                    oembed?: {
                        provider_url?: string
                        version?: string
                        title?: string
                        type?: string
                        thumbnail_width?: number
                        height?: number | null
                        width?: number
                        html?: string
                        author_name?: string
                        provider_name?: string
                        thumbnail_url?: string
                        thumbnail_height?: number
                        author_url?: string
                        url?: string
                        cache_age?: number
                    }
                }
                is_video?: boolean
                post_hint?: string
                preview?: {
                    images?: [{
                        source?: {
                            url?: string
                            width?: number
                            height?: number
                        }
                        resolutions?: [{
                            url?: string
                            width?: number
                            height?: number
                        }]
                        variants?: null
                        id?: string
                    }]
                    enabled?: boolean
                }
                url_overridden_by_dest?: string
                link_flair_template_id?: string
                author_cakeday?: boolean
            }
        }]
        before?: null
    }
}

//



//

interface SubredditArgs { sub: string }
export function useSubredditQuery({ sub }: SubredditArgs) {
    return useQuery<{ subreddit: Subreddit }>({
        query: gql`query ($sub: String) { subreddit(sub: $sub) }`,
        variables: { sub }
    })
}
